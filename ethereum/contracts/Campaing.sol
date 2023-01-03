// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimun, string memory nameCampaign) public {
        address newCampaign = address(new Campaign(minimun, nameCampaign, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimunContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;
    string public nameCampaign;

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimun, string memory name, address creator) {
        manager = creator;
        minimunContribution = minimun;
        nameCampaign = name;
    }

    function contribute() public payable { //donare, contribuire al progetto
        require(msg.value > minimunContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient)
        public onlyManager { //manager può creare una nuova richiesta
            Request storage newRequest = requests.push(); 
            newRequest.description = description;
            newRequest.value= value;
            newRequest.recipient= recipient;
            newRequest.complete= false;
            newRequest.approvalCount= 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    } 

    function finalizeRequest(uint index) public onlyManager {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
          minimunContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager
        );
    }
    
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
 }