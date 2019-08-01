const SimpleStorage = artifacts.require("ChainManager");

contract("ChainManager", accounts => {
  const ChainManager;
  
  beforeEach(async () => {
    ChainManager = await SimpleStorage.deployed();
  })

  it("should return proper owner", async () => {
    const contractOwner = ChainManager.isOwner.call()
    assert.equal(contractOwner, true, "Owner not properly set");
  })
  // it("...should store the value 89.", async () => {
    

  //   // Set value of 89
  //   await simpleStorageInstance.set(89, { from: accounts[0] });

  //   // Get stored value
  //   const storedData = await simpleStorageInstance.storedData.call();

  //   assert.equal(storedData, 89, "The value 89 was not stored.");
  // });
});
