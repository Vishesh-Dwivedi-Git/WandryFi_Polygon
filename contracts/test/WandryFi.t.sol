// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/WandryFi.sol";
import "../src/JourneyNFT.sol";

contract WandryFiTest is Test {
    WandryFi public wandryFi;
    JourneyNFT public journeyNFT;

    address public owner = address(1);
    address public verifier = address(2);
    address public user = address(3);

    uint256 public constant STAKE_AMOUNT = 1 ether;
    uint256 public constant TRAVEL_DATE = 1000 days;

    function setUp() public {
        vm.startPrank(owner);
        wandryFi = new WandryFi(verifier);
        journeyNFT = wandryFi.journeyNFT();

        // Add a test destination
        wandryFi.addDestination("Test Destination", 48856614, 2352222, 50);
        vm.stopPrank();

        // Fund user
        vm.deal(user, 100 ether);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // STAKING TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    function test_Stake_Success() public {
        uint256 travelDate = block.timestamp + 20 days;

        vm.prank(user);
        wandryFi.stake{value: STAKE_AMOUNT}(1, travelDate);

        WandryFi.Commitment memory commitment = wandryFi.getCommitment(1);
        assertEq(commitment.user, user);
        assertEq(commitment.destinationId, 1);
        assertEq(commitment.amount, STAKE_AMOUNT);
        assertEq(commitment.travelDate, travelDate);
        assertFalse(commitment.isProcessed);
    }

    function test_Stake_RevertIf_StakeTooLow() public {
        uint256 travelDate = block.timestamp + 20 days;

        vm.prank(user);
        vm.expectRevert("Stake too low");
        wandryFi.stake{value: 0.5 ether}(1, travelDate);
    }

    function test_Stake_RevertIf_TravelDateTooSoon() public {
        uint256 travelDate = block.timestamp + 10 days; // Less than 15 days

        vm.prank(user);
        vm.expectRevert("Travel date too soon");
        wandryFi.stake{value: STAKE_AMOUNT}(1, travelDate);
    }

    function test_Stake_RevertIf_DestinationInactive() public {
        uint256 travelDate = block.timestamp + 20 days;

        vm.prank(user);
        vm.expectRevert("Destination not active");
        wandryFi.stake{value: STAKE_AMOUNT}(999, travelDate); // Non-existent
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CHECK-IN TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    function test_CheckIn_Success() public {
        uint256 travelDate = block.timestamp + 20 days;

        // Stake
        vm.prank(user);
        wandryFi.stake{value: STAKE_AMOUNT}(1, travelDate);

        // Warp to travel date
        vm.warp(travelDate);

        // Create signature
        bytes32 messageHash = keccak256(abi.encodePacked(uint256(1), user, uint256(1)));
        bytes32 ethSignedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(2, ethSignedHash); // verifier is addr(2)
        bytes memory signature = abi.encodePacked(r, s, v);

        uint256 balanceBefore = user.balance;

        // Check in
        vm.prank(user);
        wandryFi.checkIn(1, signature);

        // Verify state
        WandryFi.Commitment memory commitment = wandryFi.getCommitment(1);
        assertTrue(commitment.isProcessed);
        assertTrue(commitment.isSuccess);

        // Verify NFT minted
        assertEq(journeyNFT.ownerOf(1), user);
        assertEq(journeyNFT.balanceOf(user), 1);

        // Verify funds returned (stake + base reward)
        assertGt(user.balance, balanceBefore);
    }

    function test_CheckIn_RevertIf_OutsideWindow() public {
        uint256 travelDate = block.timestamp + 20 days;

        // Stake
        vm.prank(user);
        wandryFi.stake{value: STAKE_AMOUNT}(1, travelDate);

        // Warp past claim window
        vm.warp(travelDate + 2 days);

        bytes memory signature = "";

        vm.prank(user);
        vm.expectRevert("Outside claim window");
        wandryFi.checkIn(1, signature);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FAILURE PROCESSING TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    function test_ProcessFailure_Success() public {
        uint256 travelDate = block.timestamp + 20 days;

        // Stake
        vm.prank(user);
        wandryFi.stake{value: STAKE_AMOUNT}(1, travelDate);

        // Warp past claim window
        vm.warp(travelDate + 2 days);

        uint256 poolBefore = wandryFi.getPoolBalance(1);

        // Anyone can process
        wandryFi.processFailure(1);

        // Verify state
        WandryFi.Commitment memory commitment = wandryFi.getCommitment(1);
        assertTrue(commitment.isProcessed);
        assertFalse(commitment.isSuccess);

        // Verify pool increased (minus 4% fee)
        uint256 expectedToPool = (STAKE_AMOUNT * 96) / 100;
        assertEq(wandryFi.getPoolBalance(1), poolBefore + expectedToPool);
    }

    function test_ProcessFailure_RevertIf_ClaimWindowActive() public {
        uint256 travelDate = block.timestamp + 20 days;

        vm.prank(user);
        wandryFi.stake{value: STAKE_AMOUNT}(1, travelDate);

        vm.warp(travelDate); // Within claim window

        vm.expectRevert("Claim window active");
        wandryFi.processFailure(1);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // REWARD CALCULATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════

    function test_CalculateReward_BaseOnly() public view {
        uint256 reward = wandryFi.calculateReward(1, STAKE_AMOUNT);
        assertEq(reward, wandryFi.BASE_REWARD());
    }

    function test_CalculateReward_WithPool() public {
        // First, add funds to pool via failure
        uint256 travelDate = block.timestamp + 20 days;

        vm.prank(user);
        wandryFi.stake{value: 10 ether}(1, travelDate);

        vm.warp(travelDate + 2 days);
        wandryFi.processFailure(1);

        // Now calculate reward
        uint256 reward = wandryFi.calculateReward(1, STAKE_AMOUNT);
        assertGt(reward, wandryFi.BASE_REWARD());
    }
}
