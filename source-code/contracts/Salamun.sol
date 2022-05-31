// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract Salamun is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;

    uint64 s_subscriptionId;

    address vrfCoordinator = 0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed;

    bytes32 keyHash = 0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;

    uint32 callbackGasLimit = 100000;

    uint32 numWords = 2;

    uint16 requestConfirmation = 3;

    uint256[] public s_randomWords;

    uint256 public randomNumber;

    constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator){
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
    }

    function requestRandomNumber() external {
        COORDINATOR.requestRandomWords(keyHash,s_subscriptionId, requestConfirmation, callbackGasLimit, numWords);
    }

    function fulfillRandomWords(uint256, uint256[] memory randomWords) internal override{
        s_randomWords = randomWords;

        randomNumber = s_randomWords[0] % 20;
    }
}