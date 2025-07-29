import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loadContract from "../utils/loadContract";
import TransactionInfo from "../components/TransactionInfo";
import "./Exercise.css";

function Exercise3() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [message, setMessage] = useState("");
  const [string1, setString1] = useState("Solidity");
  const [string2, setString2] = useState("et React");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { contract, account } = await loadContract("GestionChaines");
        setContract(contract);
        setAccount(account);
        
        const initialMessage = await contract.methods.getMessage().call();
        setMessage(initialMessage);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    init();
  }, []);

  const handleSetMessage = async () => {
    if (!contract || !message.trim()) return;
    setLoading(true);
    try {
      const tx = await contract.methods.setMessage(message).send({ from: account });
      setLastTx(tx);
    } catch (error) {
      console.error("Error setting message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStringOperations = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const concatenated = await contract.methods.concatener(string1, string2).call();
      const length = await contract.methods.longueur(concatenated).call();
      const comparison = await contract.methods.comparer(string1, string2).call();
      
      setResults({
        concatenated,
        length,
        comparison,
        message: `"${string1}" + "${string2}" = "${concatenated}"`
      });
    } catch (error) {
      console.error("String operation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exercise-page">
      <div className="exercise-main">
        <div className="exercise-container">
          <div className="exercise-header">
            <h2>Exercice 3: Gestion des Chaînes</h2>
            <Link to="/" className="back-link">
             Retour à l'accueil
            </Link>
          </div>

          <div className="exercise-content">
            <div className="section-card">
              <h3 className="section-title">Message du Contrat</h3>
              <div className="form-group">
                <label className="form-label">Nouveau message:</label>
                <input
                  type="text"
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={handleSetMessage}
                disabled={loading}
              >
                {loading ? "Envoi..." : "Définir le Message"}
              </button>
            </div>

            <div className="section-card">
              <h3 className="section-title">Opérations sur Chaînes</h3>
              <div className="form-group">
                <label className="form-label">Chaîne 1:</label>
                <input
                  type="text"
                  className="form-control"
                  value={string1}
                  onChange={(e) => setString1(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Chaîne 2:</label>
                <input
                  type="text"
                  className="form-control"
                  value={string2}
                  onChange={(e) => setString2(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={handleStringOperations}
                disabled={loading}
              >
                {loading ? "Traitement..." : "Exécuter les Opérations"}
              </button>
            </div>

            {results && (
              <div className="result-display">
                <h4 className="result-title">Résultats</h4>
                <p className="result-value">{results.message}</p>
                <div className="result-details">
                  <p>
                    <span className="detail-label">Longueur:</span> 
                    <span>{results.length}</span>
                  </p>
                  <p>
                    <span className="detail-label">Identiques:</span> 
                    <span>{results.comparison ? "Oui" : "Non"}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {lastTx && <TransactionInfo transaction={lastTx} />}
        </div>
      </div>
    </div>
  );
}

export default Exercise3;