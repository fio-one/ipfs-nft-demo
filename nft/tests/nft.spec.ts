import { artifacts, assert, web3 } from 'hardhat';

const FiONFT = artifacts.require('FiONFT');

describe("NFT", function() {
  let accounts: string[];

  before(async function() {
    accounts = await web3.eth.getAccounts();
  });

  describe("Deployment", function() {
    it("Should be mint", async function() {
      const contract = await FiONFT.new();
      // accounts[0] is owner
      await contract.createNFT(accounts[1], 'Sample URI', { from: accounts[0] });
      /**
       * token ID starts from 1
       * token URI according to input
       * owner is account[1]
       */
      assert.equal((await contract.balanceOf(accounts[1])).toString(), '1');
      assert.equal((await contract.tokenURI(1)), 'Sample URI');
      assert.equal((await contract.ownerOf(1)), accounts[1]);
    });
  });
});
