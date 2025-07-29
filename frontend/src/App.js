import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExerciseCard from "./components/ExerciseCard";
import Navbar from "./components/Navbar";
import BlockchainInfo from "./components/BlockchainInfo";
import "./App.css";
import Web3 from "web3";

// Import des composants d'exercices
import Exercise1 from "./exercises/Exercise1";
import Exercise2 from "./exercises/Exercise2";
import Exercise3 from "./exercises/Exercise3";
import Exercise4 from "./exercises/Exercise4";
import Exercise5 from "./exercises/Exercise5";
import Exercise6 from "./exercises/Exercise6";
import Exercise7 from "./exercises/Exercise7";
import Exercise8 from "./exercises/Exercise8";

function Home({ web3, account }) {
  return (
    <div className="home-container">
      <div className="header-content">
        <h1>Projet de Fin de Module Blockchain</h1>
        <h2>Développement d'une dApp pour le TP 3</h2>
        <p className="subtitle">
          Une application décentralisée interactive pour explorer les concepts fondamentaux de Solidity
        </p>
      </div>

      <BlockchainInfo web3={web3} account={account} />

      <div className="exercises-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <ExerciseCard key={num} exerciseNum={num} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = new Web3('http://127.0.0.1:7545');
        setWeb3(web3Instance);
        
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Erreur de connexion:", error);
        alert("Veuillez démarrer Ganache et rafraîchir la page");
      }
    };

    initWeb3();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar account={account} />
        
        <Routes>
          <Route path="/" element={<Home web3={web3} account={account} />} />
          <Route path="/exercise1" element={<Exercise1 web3={web3} account={account} />} />
          <Route path="/exercise2" element={<Exercise2 web3={web3} account={account} />} />
          <Route path="/exercise3" element={<Exercise3 web3={web3} account={account} />} />
          <Route path="/exercise4" element={<Exercise4 web3={web3} account={account} />} />
          <Route path="/exercise5" element={<Exercise5 web3={web3} account={account} />} />
          <Route path="/exercise6" element={<Exercise6 web3={web3} account={account} />} />
          <Route path="/exercise7" element={<Exercise7 web3={web3} account={account} />} />
          <Route path="/exercise8" element={<Exercise8 web3={web3} account={account} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;