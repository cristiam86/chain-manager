// import SimpleStorage from "./contracts/SimpleStorage.json";
// import ComplexStorage from "./contracts/ComplexStorage.json";
// import TutorialToken from "./contracts/TutorialToken.json";
import ChainManager from './contracts/ChainManager.json';

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [ChainManager],
  events: {
    ChainManager: ['AccidentalDeposit']
  },
  polls: {
    accounts: 1500
  }
};

export default options;
