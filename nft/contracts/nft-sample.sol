// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FiONFT is Ownable(), ERC721URIStorage {
    // constructor
    constructor() ERC721("FiOSample", "FiOS") {}

    // counter
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    function createNFT(address player, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newID = _tokenIds.current();
        _safeMint(player, newID);
        _setTokenURI(newID, tokenURI);

        return newID;
    }
}
