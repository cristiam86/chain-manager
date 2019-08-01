const SimpleStorage = artifacts.require('ChainManager');
const { catchRevert } = require('./exceptions');

contract('ChainManager', accounts => {
  let ChainManager;
  const name = 'Cristiam';
  const lastName = 'Da Silva';
  const PRICE_0_01_ETHER = 10000000000000000;
  const PRICE_0_02_ETHER = 20000000000000000;

  beforeEach(async () => {
    ChainManager = await SimpleStorage.deployed();
  });

  it('should return proper owner', async () => {
    const contractOwner = await ChainManager.isOwner.call();
    assert.equal(contractOwner, true, 'Owner not properly set');
  });

  it('should return proper owner address', async () => {
    const contractOwner = await ChainManager.owner.call();
    assert.equal(contractOwner, accounts[0], 'Owner not properly set');
  });

  it('initial balance should be zero', async () => {
    const contractBalance = await ChainManager.balance.call();
    assert.equal(contractBalance, 0, 'Initial balance not zero');
  });

  it('first player is free', async () => {
    await ChainManager.buyPlayer(name, lastName, { value: 0, from: accounts[0] });
    const userPlayersBalance = await ChainManager.balanceOf(accounts[0]);

    assert.equal(userPlayersBalance, 1, 'Can buy first player for free');
  });

  it('player price increments after first buy', async () => {
    await ChainManager.buyPlayer(name, lastName, { value: 0, from: accounts[1] });
    const userPlayersBalance1 = await ChainManager.balanceOf(accounts[1]);
    assert.equal(userPlayersBalance1, 1, 'Can buy first player for free');

    await catchRevert(ChainManager.buyPlayer(name, lastName, { value: 0, from: accounts[1] }));
  });

  it('can buy second player with proper amount', async () => {
    await ChainManager.buyPlayer(name, lastName, { value: 0, from: accounts[2] });
    const userPlayersBalance1 = await ChainManager.balanceOf(accounts[2]);
    assert.equal(userPlayersBalance1, 1, 'Can buy first player for free');

    await ChainManager.buyPlayer(name, lastName, { value: PRICE_0_01_ETHER, from: accounts[2] });
    const userPlayersBalance2 = await ChainManager.balanceOf(accounts[2]);

    assert.equal(userPlayersBalance2, 2, 'Can not buy second player for free');
  });
});
