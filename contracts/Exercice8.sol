// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Payment {
    address payable public recipient;

    constructor(address payable _recipient) {
        recipient = _recipient;
    }

    function receivePayment() public payable {
        require(msg.value > 0, "Envoyer un montant superieur a 0");
    }

    function withdraw() public {
        require(msg.sender == recipient, "Seul le destinataire peut retirer");
        payable(recipient).transfer(address(this).balance);
    }
}
