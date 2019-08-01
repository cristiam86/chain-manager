var Lighthouse = artifacts.require('Lighthouse');
const ChainManager = artifacts.require('ChainManager');

module.exports = function(deployer, network) {
  if (network == 'rinkeby') {
    var address = '0x613D2159db9ca2fBB15670286900aD6c1C79cC9a'; //address of RNG lighthouse on rinkeby
    deployer.deploy(ChainManager, address);
  } else {
    // For local testing
    // First deploy the lighthouse, then use the lighthouse's address to deploy gamble. This allows
    // gamble to know which lighthouse to obtain data from.
    deployer.deploy(Lighthouse).then(function() {
      return deployer.deploy(ChainManager, Lighthouse.address);
    });
  }
};
