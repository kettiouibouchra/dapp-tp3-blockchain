const Exercice1 = artifacts.require("Exercice1");
const Exercice2 = artifacts.require("Exercice2");
const GestionChaines = artifacts.require("GestionChaines");
const Exercice4 = artifacts.require("Exercice4");
const Exercice5 = artifacts.require("Exercice5");
const Exercice6 = artifacts.require("Exercice6");
const Rectangle = artifacts.require("Rectangle");
const Payment = artifacts.require("Payment");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Exercice1);
  await deployer.deploy(Exercice2);
  await deployer.deploy(GestionChaines);
  await deployer.deploy(Exercice4);
  await deployer.deploy(Exercice5);
  await deployer.deploy(Exercice6);
  await deployer.deploy(Rectangle, 1, 2, 3, 4);  
  await deployer.deploy(Payment, accounts[0]);  
};
