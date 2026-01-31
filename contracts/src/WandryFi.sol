// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "./JourneyNFT.sol";

/**
 * @title WandryFi
 * @notice Stake. Travel. Prove. Earn. — Core protocol for gamified travel commitments.
 * @dev Users stake MATIC on destinations, verify arrival via ZK proofs, and earn rewards.
 */
contract WandryFi is Ownable, ReentrancyGuard {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════════

    uint256 public constant MIN_STAKE = 1 ether; // 1 MATIC minimum
    uint256 public constant MIN_STAKE_DURATION = 15 days;
    uint256 public constant CLAIM_WINDOW = 1 days;
    uint256 public constant BASE_REWARD = 0.002 ether; // 0.002 MATIC
    uint256 public constant BETA = 50; // 0.5 scaled by 100
    uint256 public constant MAX_POOL_EMISSION = 10; // 10% max
    uint256 public constant PLATFORM_FEE_PERCENT = 4; // 4%
    uint256 public constant CHECK_IN_RADIUS = 50; // 50 meters

    // ═══════════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════════

    struct Destination {
        uint256 id;
        string name;
        int256 latitude; // Scaled by 1e6
        int256 longitude; // Scaled by 1e6
        uint256 placeValue; // 0-100 difficulty
        uint256 poolBalance;
        bool active;
    }

    struct Commitment {
        uint256 id;
        address user;
        uint256 destinationId;
        uint256 amount;
        uint256 travelDate;
        uint256 createdAt;
        bool isProcessed;
        bool isSuccess;
    }

    JourneyNFT public journeyNFT;
    address public verifier;

    uint256 public nextDestinationId = 1;
    uint256 public nextCommitmentId = 1;

    mapping(uint256 => Destination) public destinations;
    mapping(uint256 => Commitment) public commitments;
    mapping(address => uint256[]) public userCommitments;

    uint256 public platformFees;

    // ═══════════════════════════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════════════════════════

    event DestinationAdded(uint256 indexed id, string name, int256 lat, int256 lng);
    event Staked(
        uint256 indexed commitmentId,
        address indexed user,
        uint256 destinationId,
        uint256 amount,
        uint256 travelDate
    );
    event CheckedIn(
        uint256 indexed commitmentId,
        address indexed user,
        uint256 reward,
        uint256 nftTokenId
    );
    event FailureProcessed(
        uint256 indexed commitmentId,
        address indexed user,
        uint256 amountToPool
    );

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════════════════

    constructor(address _verifier) Ownable(msg.sender) {
        verifier = _verifier;
        journeyNFT = new JourneyNFT(address(this));
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ADMIN FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    function addDestination(
        string calldata _name,
        int256 _latitude,
        int256 _longitude,
        uint256 _placeValue
    ) external onlyOwner {
        require(_placeValue <= 100, "Invalid place value");

        uint256 id = nextDestinationId++;
        destinations[id] = Destination({
            id: id,
            name: _name,
            latitude: _latitude,
            longitude: _longitude,
            placeValue: _placeValue,
            poolBalance: 0,
            active: true
        });

        emit DestinationAdded(id, _name, _latitude, _longitude);
    }

    function setVerifier(address _verifier) external onlyOwner {
        verifier = _verifier;
    }

    function withdrawFees() external onlyOwner {
        uint256 amount = platformFees;
        platformFees = 0;
        payable(owner()).transfer(amount);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CORE FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * @notice Stake MATIC for a journey commitment
     * @param _destinationId The target destination
     * @param _travelDate Unix timestamp of planned arrival (must be 15+ days out)
     */
    function stake(uint256 _destinationId, uint256 _travelDate) external payable nonReentrant {
        require(msg.value >= MIN_STAKE, "Stake too low");
        require(_travelDate >= block.timestamp + MIN_STAKE_DURATION, "Travel date too soon");
        require(destinations[_destinationId].active, "Destination not active");

        uint256 commitmentId = nextCommitmentId++;
        commitments[commitmentId] = Commitment({
            id: commitmentId,
            user: msg.sender,
            destinationId: _destinationId,
            amount: msg.value,
            travelDate: _travelDate,
            createdAt: block.timestamp,
            isProcessed: false,
            isSuccess: false
        });

        userCommitments[msg.sender].push(commitmentId);

        emit Staked(commitmentId, msg.sender, _destinationId, msg.value, _travelDate);
    }

    /**
     * @notice Check in at destination with backend verification signature
     * @param _commitmentId The commitment to verify
     * @param _signature Backend verification signature
     */
    function checkIn(uint256 _commitmentId, bytes calldata _signature) external nonReentrant {
        Commitment storage commitment = commitments[_commitmentId];

        require(commitment.user == msg.sender, "Not your commitment");
        require(!commitment.isProcessed, "Already processed");
        require(
            block.timestamp >= commitment.travelDate &&
                block.timestamp <= commitment.travelDate + CLAIM_WINDOW,
            "Outside claim window"
        );

        // Verify signature from trusted verifier
        bytes32 messageHash = keccak256(
            abi.encodePacked(_commitmentId, msg.sender, commitment.destinationId)
        );
        bytes32 ethSignedHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedHash.recover(_signature);
        require(signer == verifier, "Invalid signature");

        commitment.isProcessed = true;
        commitment.isSuccess = true;

        // Calculate reward
        uint256 reward = calculateReward(commitment.destinationId, commitment.amount);
        uint256 totalPayout = commitment.amount + reward;

        // Deduct from pool
        if (reward > 0) {
            destinations[commitment.destinationId].poolBalance -= reward;
        }

        // Mint NFT
        uint256 tokenId = journeyNFT.mint(msg.sender, commitment.destinationId);

        // Transfer funds
        payable(msg.sender).transfer(totalPayout);

        emit CheckedIn(_commitmentId, msg.sender, reward, tokenId);
    }

    /**
     * @notice Process failed journey (callable by anyone after claim window)
     * @param _commitmentId The expired commitment
     */
    function processFailure(uint256 _commitmentId) external nonReentrant {
        Commitment storage commitment = commitments[_commitmentId];

        require(!commitment.isProcessed, "Already processed");
        require(block.timestamp > commitment.travelDate + CLAIM_WINDOW, "Claim window active");

        commitment.isProcessed = true;
        commitment.isSuccess = false;

        // Calculate platform fee
        uint256 fee = (commitment.amount * PLATFORM_FEE_PERCENT) / 100;
        uint256 toPool = commitment.amount - fee;

        platformFees += fee;
        destinations[commitment.destinationId].poolBalance += toPool;

        emit FailureProcessed(_commitmentId, commitment.user, toPool);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // VIEW FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    function getPoolBalance(uint256 _destinationId) external view returns (uint256) {
        return destinations[_destinationId].poolBalance;
    }

    function getCommitment(uint256 _commitmentId) external view returns (Commitment memory) {
        return commitments[_commitmentId];
    }

    function getDestination(uint256 _destinationId) external view returns (Destination memory) {
        return destinations[_destinationId];
    }

    function getUserCommitments(address _user) external view returns (uint256[] memory) {
        return userCommitments[_user];
    }

    /**
     * @notice Calculate reward based on pool size and stake
     * @dev Reward = BASE_REWARD + (pool * beta * stake / totalStake) capped at 10%
     */
    function calculateReward(
        uint256 _destinationId,
        uint256 _stakeAmount
    ) public view returns (uint256) {
        uint256 poolBalance = destinations[_destinationId].poolBalance;
        if (poolBalance == 0) return BASE_REWARD;

        uint256 maxEmission = (poolBalance * MAX_POOL_EMISSION) / 100;
        uint256 dynamicReward = (_stakeAmount * BETA * poolBalance) / (100 * 1 ether);

        uint256 reward = BASE_REWARD + dynamicReward;
        if (reward > maxEmission) reward = maxEmission;

        return reward;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CHAINLINK KEEPERS
    // ═══════════════════════════════════════════════════════════════════════════

    function checkUpkeep(
        bytes calldata
    ) external view returns (bool upkeepNeeded, bytes memory performData) {
        uint256[] memory expired = new uint256[](100);
        uint256 count = 0;

        for (uint256 i = 1; i < nextCommitmentId && count < 100; i++) {
            if (
                !commitments[i].isProcessed &&
                block.timestamp > commitments[i].travelDate + CLAIM_WINDOW
            ) {
                expired[count++] = i;
            }
        }

        upkeepNeeded = count > 0;

        // Resize array
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = expired[i];
        }
        performData = abi.encode(result);
    }

    function performUpkeep(bytes calldata performData) external {
        uint256[] memory expired = abi.decode(performData, (uint256[]));
        for (uint256 i = 0; i < expired.length; i++) {
            if (
                !commitments[expired[i]].isProcessed &&
                block.timestamp > commitments[expired[i]].travelDate + CLAIM_WINDOW
            ) {
                // Inline failure processing to save gas
                Commitment storage commitment = commitments[expired[i]];
                commitment.isProcessed = true;
                commitment.isSuccess = false;

                uint256 fee = (commitment.amount * PLATFORM_FEE_PERCENT) / 100;
                uint256 toPool = commitment.amount - fee;

                platformFees += fee;
                destinations[commitment.destinationId].poolBalance += toPool;

                emit FailureProcessed(expired[i], commitment.user, toPool);
            }
        }
    }

    receive() external payable {}
}
