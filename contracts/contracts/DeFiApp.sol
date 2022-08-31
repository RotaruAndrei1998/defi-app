// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeFiApp is ERC20, ERC20Burnable, Pausable, Ownable {
    constructor() ERC20("DeFiApp", "DROT") {
        _mint(address(this), 100000 * (10 ** 18));
    }

    struct StakedValue {
        address ownerAddress;
        uint256 depositTimestamp;
        uint256 amount;
    }

    mapping(address => StakedValue[]) public balances;
    address[] public addresses;
    uint256 public constant rewardRatePerMinute = 1;
    uint256 public numberOfStakes = 0;
    uint256 totalStakedValue = 0;

    event tokensStaked(address from, uint256 amount, uint256 depositTimestamp);
    event tokensUnstaked(address to, uint256 amount, uint256 depositTimestamp);

    function getAddresses () public view returns (address[] memory) {
        return addresses;
    }
    function getTotalStakedValue () public view returns (uint256) {
        return totalStakedValue;
    }
    function addAddress(address _address) private {
        bool found = false;
        for(uint i = 0; i < addresses.length; i++) {
            if(addresses[i] == _address) {
                found = true;
            }
        }
        if(!found) {
    addresses.push(_address);
        }
    }

    function remove(address senderAddress, uint256 depositTimestamp) internal returns(StakedValue[] memory) {
        if (balances[senderAddress].length == 0)  return balances[senderAddress];
        if(balances[senderAddress].length == 1) {
            balances[senderAddress].pop();
            return balances[senderAddress];
        }

        bool found = false;
        for (uint i = 0; i<balances[senderAddress].length-1; i++){
            if(balances[senderAddress][i].depositTimestamp == depositTimestamp) {
                found = true;
            }
            if(found) {
                balances[senderAddress][i] = balances[senderAddress][i+1];
            }
        }
        balances[senderAddress].pop();
        return balances[senderAddress];
    }

    function getSomeDrot() public {
        IERC20(address(this)).transfer(msg.sender, 100 * (10 ** 18));
    }

    function getNumberOfStake() public view returns (uint256) {
       return numberOfStakes;
    }

    function getStakedUserBalances() public view returns (StakedValue[] memory) {
        StakedValue[] memory accounts = new StakedValue[](balances[msg.sender].length);
        accounts = balances[msg.sender];
        return accounts;
    }

    function getAllStakedUserBalances() public view returns (StakedValue[] memory) {
        StakedValue[] memory usersBalance = new StakedValue[](numberOfStakes);
        uint index = 0;
        for (uint i = 0; i<addresses.length; i++){
            if(balances[addresses[i]].length > 0) {
            for(uint j = 0; j< balances[addresses[i]].length; j++) {
                usersBalance[index] = StakedValue(balances[addresses[i]][j].ownerAddress, balances[addresses[i]][j].depositTimestamp, balances[addresses[i]][j].amount);
                index++;
            }}
}
        return usersBalance;
    }

    function stake(address tokenAddress, uint256 amount) public payable {
        require(IERC20(tokenAddress) == IERC20(address(this)), "You are only allowed to stake the official erc20 token address which was passed into this contract's constructor");
        require(amount <= IERC20(tokenAddress).balanceOf(msg.sender), "Not enough DROT tokens in your wallet, please try lesser amount");
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount * (10 ** 18));
        addAddress(msg.sender);
        balances[msg.sender].push(StakedValue(msg.sender, block.timestamp,amount));
        numberOfStakes++;
        totalStakedValue = totalStakedValue + amount;
        emit tokensStaked(msg.sender, amount * (10 ** 18),  block.timestamp);
    }

    function redeem(IERC20 token, uint id) public {
        require(token == IERC20(address(this)), "Token parameter must be the same as the erc20 contract address which was passed into the constructor");
        uint256 interest = (block.timestamp - balances[msg.sender][id].depositTimestamp) / 60  * rewardRatePerMinute;
        uint256 amount = balances[msg.sender][id].amount + interest;
        _mint(address(this), interest * (10 ** 18));
        token.transfer(msg.sender, amount * (10 ** 18));
        totalStakedValue = totalStakedValue - balances[msg.sender][id].amount;
        numberOfStakes--;
        emit tokensUnstaked(msg.sender, amount * (10 ** 18), balances[msg.sender][id].depositTimestamp);

        remove(msg.sender, balances[msg.sender][id].depositTimestamp);
    }


    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
    internal
    whenNotPaused
    override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
