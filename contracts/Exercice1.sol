// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Exercice1 {
    uint public nombre1 = 5;  // Initialisation directe
    uint public nombre2 = 10; 

    // Fonction view (lecture seule)
    function addition1() public view returns (uint) {
        return nombre1 + nombre2;
    }

    // Fonction pure (pas d'accès au storage)
    function addition2(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}
