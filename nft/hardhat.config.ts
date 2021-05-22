import path from 'path';
import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();
import '@nomiclabs/hardhat-truffle5';
import '@nomiclabs/hardhat-web3';
import '@nomiclabs/hardhat-web3-legacy';
import '@typechain/hardhat';

export const DEFAULT_BLOCK_GAS_LIMIT = 12500000;
export const DEFAULT_GAS_PRICE = 8000000000;
const HARDHATEVM_CHAINID = 31337;
const DEFAULT_DERIVEPATH = "m/44'/60'/0'/0";

const MNEMONIC = process.env.MNEMONIC || '';
const INFURA_KEY = process.env.INFURA || '';

const config: HardhatUserConfig = {
  // default network
  defaultNetwork: 'hardhat',

  // sol
  solidity: {
    compilers: [
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },

  // network
  networks: {
    hardhat: {
      blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
      gas: DEFAULT_BLOCK_GAS_LIMIT,
      gasPrice: DEFAULT_GAS_PRICE,
      chainId: HARDHATEVM_CHAINID,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: {
        mnemonic: MNEMONIC,
        path: DEFAULT_DERIVEPATH,
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
      accounts: {
        mnemonic: MNEMONIC,
        path: DEFAULT_DERIVEPATH,
      },
    },
  },

  // path
  paths: {
    sources: path.resolve(__dirname, 'contracts'),
    tests: path.resolve(__dirname, 'tests'),
    cache: path.resolve(__dirname, 'dist/caches'),
    artifacts: path.resolve(__dirname, 'dist/artifacts'),
  },

  // type chain
  typechain: {
    outDir: 'dist/types',
    target: 'web3-v1',
  },
}

export default config;
