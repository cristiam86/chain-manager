pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "./Ilighthouse.sol";
import "./Counters.sol";

/// @title Collectible football players game
/// @author Cristiam Da Silva https://www.linkedin.com/in/cristiam-da-silva/
/// @notice You can play this game at
/// @dev Current version is experimental
contract ChainManager is ERC721 {
    using Counters for Counters.Counter;

    // Represents the collectible player appearance and skills
    // id: relates the player with the NFT 721 token
    // name: name given to the player
    // lasName: lastname given to the player
    // dna: 20 base 16 characters that sets the level of each skill
    //// 1. skinColor;
    //// 2. hairColor;
    //// 3. hairLength;
    //// 4. eyes;
    //// 5. mouth;
    // Athletics skills
    //// 6.  shape;
    //// 7.  speed;
    //// 8.  endurance;
    //// 9.  concentration;
    //// 10. strength;
    //// 11. height;
    // Technical skills
    //// 12. shoot;
    //// 13. defense;
    //// 14. goalkeep;
    //// 15. technical;
    //// 16. creativity;
    //// 17. decision;
    //// 18. aim;
    // Mental skills
    //// 19. roguish;
    //// 20. stability;
    struct Player {
        uint256 id;
        string name;
        string lastName;
        bytes dna;
    }

    ILighthouse public myLighthouse;
    address payable private _owner;
    uint256 private constant PRICE_0_01_ETHER = 10000000000000000;
    uint256 private constant PRICE_0_02_ETHER = 20000000000000000;

    mapping(uint256 => Player) public players;
    mapping(address => uint256[]) public teams;
    Counters.Counter private nextTokenId;

    event AccidentalDeposit(address indexed sender, uint value);
    event PlayerCreated(address indexed sender, uint256 indexed playerId, uint256 value, uint256 price);
    event Log(address indexed sender, uint value);

    /**
     * @author Cristiam Da Silva
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    constructor(ILighthouse _myLighthouse) public {
        _owner = msg.sender;
        myLighthouse = _myLighthouse;
    }

    /**
     * @author Cristiam Da Silva
     * @dev Fallback function allows to deposit ether.
     */
    function() external payable {
        if (msg.value > 0) {
            emit AccidentalDeposit(msg.sender, msg.value);
	    }
    }

    /**
     * @author Cristiam Da Silva
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @author Cristiam Da Silva
     * @dev Returns true if the caller is the current owner.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    /// @author Cristiam Da Silva
    /// @notice Gets the balance of the contract
    /// @return Contract's balance
    function balance() external view returns(uint256) {
        return address(this).balance;
    }

    /// @author Cristiam Da Silva
    /// @notice Allows contract owner to withdraw the balance
    function withdraw() external onlyOwner {
        _owner.transfer(address(this).balance);
        emit Log(_owner, address(this).balance);
    }

    /// @author Cristiam Da Silva
    /// @notice Allows to get players count for sender
    /// @return number of players owned by msg.sender
    function getTeamPlayersCount() external view returns (uint256){
        return balanceOf(msg.sender);
    }

    /// @author Cristiam Da Silva
    /// @notice Allows to get players ids to represent the team
    /// @return array of players ids owned by msg.sender
    function getTeamPlayersIds() external view returns (uint256[] memory){
        require(balanceOf(msg.sender) > 0, "Sender doesn't have any player");
        return teams[msg.sender];
    }

    /// @author Cristiam Da Silva
    /// @notice gets the player with a given id
    /// @param playerId the id of the player
    /// @return dna of player with id playerId
    function getPlayer(uint256 playerId) external view
        returns(uint256 id, string memory name, string memory lastName, bytes memory dna) {
        require(_exists(playerId), "Player doesn't exists");
        Player storage player = players[playerId];
        return (player.id, player.name, player.lastName, player.dna);
    }

    /// @author Cristiam Da Silva
    /// @notice calculates the price of buy a player based on team size
    /// @return price of the next player to be bought
    function getPlayerPrice() public view returns (uint256) {
        uint256 teamSize = balanceOf(msg.sender);
        uint256 price = PRICE_0_02_ETHER;

        if(teamSize > 0 && teamSize < 12) {
            price = PRICE_0_01_ETHER;
        } else {
            price = 0;
        }
        return price;
    }

    /// @author Cristiam Da Silva
    /// @notice calculates the player's DNS with oracle random combined with block data
    /// @return price of the next player to be bought
    function calculatePlayerDNA() public view returns(bytes memory){
        (uint256 randomData, ) = myLighthouse.peekData();
        uint256 random = randomData * block.timestamp;
        uint256 _blockNumber = block.number;
        bytes32 _blockHash = blockhash(_blockNumber-1);
        uint256 shift = (_blockNumber * random) % 9;
        bytes32 hashDNA = _blockHash >> shift;

        bytes memory bytesString = new bytes(10);
        for (uint i = 0; i < 10; i++) {
            byte char = byte(bytes32(uint(hashDNA) * 2 ** (8 * i)));
            bytesString[i] = char;
        }
        return bytesString;
    }

    /// @author Cristiam Da Silva
    /// @notice creates a new NFT player
    /// @param name the name of the new player
    /// @param lastName the last name of the new player
    function buyPlayer(string memory name, string memory lastName) public payable {
        uint256 price = getPlayerPrice();
        require(msg.value >= price, "Insufficient value to buy a player");

        // Mint token
        uint256 tokenId = nextTokenId.current();
        _mint(msg.sender, tokenId);

        // Create new player with random DNA
        bytes memory dna = calculatePlayerDNA();
        Player memory player = Player(tokenId, name, lastName, dna);
        players[tokenId] = player;

        // Add player to team
        uint256[] storage senderTeam = teams[msg.sender];
        senderTeam.push(tokenId);

        // Increment TokenID
        nextTokenId.increment();
        emit PlayerCreated(msg.sender, tokenId, msg.value, price);
    }
}