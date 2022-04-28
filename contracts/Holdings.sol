// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Holdings is Ownable {
    mapping(address => uint256) balances;
    
    function deposit(uint256 _amount) public payable {    
        require(msg.value == _amount, "You did not send enough eth!");
        balances[msg.sender] += _amount;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function getTotalBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function userWithdraw(uint256 _amount) public {    
        require(_amount <= getBalance(), "You are trying to withdraw more than you have!");

        payable(msg.sender).transfer(_amount);
        balances[msg.sender] -= _amount;
    }
    
    function userWithdrawAll() public {
        require(balances[msg.sender] > 0, "You have nothing to withdraw!");
        payable(msg.sender).transfer(getBalance());
        balances[msg.sender] = 0;
    }

    function withdrawAll() external onlyOwner {
        payable(owner()).transfer(getTotalBalance());
    }
}