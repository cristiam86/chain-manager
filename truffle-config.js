var HDWalletProvider = require('truffle-hdwallet-provider');
const path = require('path');

const mnemonic = 'end insane large horse dismiss hole genre pull woman script gold ribbon';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'app/src/contracts'),
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/4a0d580c7e6a44589c51804e246f9d1c');
      },
      network_id: 4
    }
  }
};
