import { contract, artifacts, web3 } from 'hardhat';

const FiONFT = artifacts.require('FiONFT');

(async () => {
  try {
    const contract = await FiONFT.new();
    console.table({
      address: contract.address,
      owner: (await contract.owner()),
    });
    process.exit(0)
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
})();
