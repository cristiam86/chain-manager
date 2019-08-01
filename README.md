# Project Chain manager

Chain manager is a crypto collectible game of soccer players. Users can buy and sell players through the ERC 721 NFT token standard.

The player stats are calculated with a pseudo random function with the help of the Rhombus Oracle.

## Setup environment

1. Install dependencies
   Go to project root folder and execute `npm install`
2. Start Ganache with the command `ganache-cli`
3. Copy the mnemonic words and paste them on the truffle-config.js file
4. Import the first account generated into your metamask
5. Get some ether into that account
6. Go to the project root folder and execute `truffle migrate --network rinkeby` (add `--reset` flag if the contract has been previously migrated)
7. After the contract is deployed into the Rinkeby test network go to the app folder inside the project and launch de development server with the command `npm run start`

## Playing

1. When the first page loads, you can buy your first player for free just entering his name and lastname
2. The player card should appear under the form with his picture and stats

## Testing
In order to test the contract go to the root folder of the project and execute `truffle test`

## Coming soon features

- Sell players automatically to the smart contracts
- Sell players through marketplace
- Pay with DAI stablecoin
- Random names generator for players
- Team factory contract to make teams
- Compete with your temas in leagues and individual matches
- Matches engine with ZKsnarks prove offchain
- Events and injuries for players
- Addons for players such as shoes and tatoos
