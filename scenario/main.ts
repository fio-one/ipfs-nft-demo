require('dotenv').config();
import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';

import upload from './ipfs';
import { abi } from './FiONFT.json';

const MNEMONIC = process.env.MNEMONIC || '';
const INFURA_KEY = process.env.INFURA || '';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '';

/**
 * wallet
 */
const provider = new HDWalletProvider({
  mnemonic: MNEMONIC,
  providerOrUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
});

/**
 * provider
 */
const web3 = new Web3(provider);

// or
// const web3 = new Web3(
//   new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${INFURA_KEY}`),
// );

/**
 * contract
 */
const contract = new web3.eth.Contract(abi as any, CONTRACT_ADDRESS);

(async () => {
  // ipfs
  const { cid } = await upload('Hello World');

  // ethereum
  const accounts = await web3.eth.getAccounts();
  await contract.methods.createNFT(accounts[0], cid.toString()).send({ from: accounts[0] })
    .on('transactionHash', function (hash: any) {
      console.log('tx_hast', hash);
    })
    .on('receipt', function(receipt: any){
      console.log(receipt);
    })
    .on('error', (err: any) => {
      throw err;
    });
  process.exit(0);
})();
