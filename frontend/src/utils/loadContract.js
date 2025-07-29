import Web3 from "web3";
import Exercice1 from "../contracts/Exercice1.json";
import Exercice2 from "../contracts/Exercice2.json";
import GestionChaines from "../contracts/GestionChaines.json";
import Exercice4 from "../contracts/Exercice4.json";
import Exercice5 from "../contracts/Exercice5.json";
import Exercice6 from "../contracts/Exercice6.json";
import Rectangle from "../contracts/Rectangle.json";
import Payment from "../contracts/Payment.json";

const CONTRACT_ADDRESSES = {
  Exercice1: "0x0CB16b4544944FA13EB897414EE4819aE897238b",
  Exercice2: "0x25F9bf7B4AB2F5A20987c33Dfd6B10BFfF5a6031",
  GestionChaines: "0xD752f304688aA9f8535A1A9718B7f4e4bD958c29",
  Exercice4: "0xd4eAF5D5f6CF80A17766f40Ae6D80dC7657B69c5",
  Exercice5: "0x53b2cbB3CC8001128f681b8B98a7c8a5e2977e5D",
  Exercice6: "0xB9b681E541e9B50aa2e2E419F09e05b263D7a231",
  Rectangle: "0xd4D62888a479797F7eED8021E7c306CFaD67B7B0",
  Payment: "0x9fB9883a8D55f02162d63CFfa580d92FF9d7e69B"
};

const CONTRACT_ARTIFACTS = {
  Exercice1,
  Exercice2,
  GestionChaines,
  Exercice4,
  Exercice5,
  Exercice6,
  Rectangle,
  Payment
};

export default async (contractName) => {
  try {
    const web3 = new Web3("http://127.0.0.1:7545");
    
    if (!CONTRACT_ARTIFACTS[contractName]) {
      throw new Error(`Contrat ${contractName} introuvable`);
    }

    if (!CONTRACT_ADDRESSES[contractName]) {
      throw new Error(`Adresse non définie pour ${contractName}`);
    }

    const accounts = await web3.eth.getAccounts();
    
    return {
      contract: new web3.eth.Contract(
        CONTRACT_ARTIFACTS[contractName].abi,
        CONTRACT_ADDRESSES[contractName]
      ),
      account: accounts[0],
      web3
    };
  } catch (error) {
    console.error("Erreur dans loadContract:", error);
    throw error;
  }
};
