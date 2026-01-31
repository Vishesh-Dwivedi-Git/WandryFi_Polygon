// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title JourneyNFT
 * @notice ERC-721 collectibles representing completed travel journeys.
 * @dev Minted by WandryFi contract upon successful check-in.
 */
contract JourneyNFT is ERC721, ERC721Enumerable, Ownable {
    // ═══════════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════════

    address public wandryFi;
    string public baseURI;
    uint256 private _nextTokenId = 1;

    struct JourneyMetadata {
        uint256 destinationId;
        uint256 mintedAt;
    }

    mapping(uint256 => JourneyMetadata) public journeyData;

    // ═══════════════════════════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════════════════════════

    event JourneyMinted(uint256 indexed tokenId, address indexed traveler, uint256 destinationId);

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════════════════

    constructor(address _wandryFi) ERC721("Wanderify Journey", "WJNY") Ownable(msg.sender) {
        wandryFi = _wandryFi;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ADMIN
    // ═══════════════════════════════════════════════════════════════════════════

    function setBaseURI(string calldata _uri) external onlyOwner {
        baseURI = _uri;
    }

    function setWandryFi(address _wandryFi) external onlyOwner {
        wandryFi = _wandryFi;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // MINTING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * @notice Mint a journey NFT. Only callable by WandryFi contract.
     * @param _to The traveler address
     * @param _destinationId The destination that was visited
     * @return tokenId The minted token ID
     */
    function mint(address _to, uint256 _destinationId) external returns (uint256) {
        require(msg.sender == wandryFi, "Only WandryFi can mint");

        uint256 tokenId = _nextTokenId++;
        _safeMint(_to, tokenId);

        journeyData[tokenId] = JourneyMetadata({
            destinationId: _destinationId,
            mintedAt: block.timestamp
        });

        emit JourneyMinted(tokenId, _to, _destinationId);
        return tokenId;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // VIEW
    // ═══════════════════════════════════════════════════════════════════════════

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function getJourneyData(uint256 _tokenId) external view returns (JourneyMetadata memory) {
        require(_ownerOf(_tokenId) != address(0), "Token does not exist");
        return journeyData[_tokenId];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // OVERRIDES (ERC721Enumerable)
    // ═══════════════════════════════════════════════════════════════════════════

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
