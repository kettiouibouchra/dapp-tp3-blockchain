import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import loadContract from "../utils/loadContract";
import TransactionInfo from "../components/TransactionInfo";
import "./Exercise.css";

function Exercise8() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { contract, account, web3 } = await loadContract("Payment");
        setContract(contract);
        setAccount(account);
        
        const bal = await web3.eth.getBalance(contract.options.address);
        setBalance(web3.utils.fromWei(bal, 'ether'));
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    init();
  }, []);

  const sendPayment = async () => {
    if (!contract || !amount || amount <= 0) return;
    setLoading(true);
    try {
      const web3 = new Web3(window.ethereum || "http://127.0.0.1:7545");
      const tx = await contract.methods.receivePayment().send({
        from: account,
        value: web3.utils.toWei(amount.toString(), 'ether')
      });
      setLastTx(tx);
      
      const bal = await web3.eth.getBalance(contract.options.address);
      setBalance(web3.utils.fromWei(bal, 'ether'));
      setAmount("");
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const web3 = new Web3(window.ethereum || "http://127.0.0.1:7545");
      const tx = await contract.methods.withdraw().send({ from: account });
      setLastTx(tx);
      
      const bal = await web3.eth.getBalance(contract.options.address);
      setBalance(web3.utils.fromWei(bal, 'ether'));
    } catch (error) {
      console.error("Withdraw error:", error);
      alert("Seul le destinataire peut retirer les fonds");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exercise-page">
      <div className="exercise-main">
        <div className="exercise-container">
          <div className="exercise-header">
            <h2>Exercice 8: Gestion des Paiements</h2>
            <Link to="/" className="back-link">
               Retour à l'accueil
            </Link>
          </div>

          <div className="exercise-content">
            <div className="section-card">
              <h3 className="section-title">Informations du Contrat</h3>
              <div className="contract-info">
                <p><strong>Solde du contrat:</strong> {balance} ETH</p>
                <p><strong>Votre adresse:</strong> 
                  <span className="account-address">
                    {account.substring(0, 6)}...{account.substring(38)}
                  </span>
                </p>
              </div>
            </div>

            <div className="section-card">
              <h3 className="section-title">Envoyer des ETH</h3>
              <div className="form-group">
                <label className="form-label">Montant (ETH):</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={sendPayment}
                disabled={loading}
              >
                {loading ? "Envoi..." : "Envoyer des ETH"}
              </button>
            </div>

            <div className="section-card">
              <h3 className="section-title">Retirer les Fonds</h3>
              <p className="warning-text">
                Seul le destinataire peut retirer les fonds du contrat
              </p>
              <button 
                className="btn btn-primary warning"
                onClick={withdraw}
                disabled={loading}
              >
                {loading ? "Traitement..." : "Retirer les ETH"}
              </button>
            </div>
          </div>

          {lastTx && <TransactionInfo transaction={lastTx} />}
        </div>
      </div>
    </div>
  );
}

export default Exercise8;