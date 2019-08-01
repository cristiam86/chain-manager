# Considerations to avoid attacks

Three of the main considerations implemented to avoid attacks into the ChainManager contract are:

1. Avoid usage of send and using the transfer function to withdraw the contract balance.
2. Avoid re-entrancy to the buy function incrementing the balance before generating the player.
3. The owner pattern helps to restrict access to admin functions only to the contract owner.
