// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercice6 {
    uint[] public nombres;

    constructor() {
        nombres = [10, 20, 30]; // Initialisation explicite
    }

    function ajouterNombre(uint nombre) public {
        nombres.push(nombre);
    }

    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Index hors limite");
        return nombres[index];
    }

    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }

    function calculerSomme() public view returns (uint) {
        uint somme = 0;
        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }
        return somme;
    }
}
