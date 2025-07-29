import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loadContract from "../utils/loadContract";
import TransactionInfo from "../components/TransactionInfo";
import "./Exercise.css";

function Exercise1() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { contract, account } = await loadContract("Exercice1");
        setContract(contract);
        setAccount(account);
        
        // Load initial values
        const num1 = await contract.methods.nombre1().call();
        const num2 = await contract.methods.nombre2().call();
        setNumber1(num1);
        setNumber2(num2);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    
    init();
  }, []);

  const calculateSum1 = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const result = await contract.methods.addition1().call();
      setResult1(result);
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSum2 = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const result = await contract.methods.addition2(
        parseInt(number1),
        parseInt(number2)
      ).call();
      setResult2(result);
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exercise-page">
      <div className="exercise-main">
        <div className="exercise-container">
          <div className="exercise-header">
            <h2>Exercice 1: Opérations Mathématiques</h2>
            <Link to="/" className="back-link">
               Retour à l'accueil
            </Link>
          </div>

          <div className="exercise-content">
            <div className="section-card">
              <h3 className="section-title">Somme des Variables d'État</h3>
              <div className="form-group">
                <label className="form-label">Nombre 1 (stocké):</label>
                <input
                  type="number"
                  className="form-control"
                  value={number1}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nombre 2 (stocké):</label>
                <input
                  type="number"
                  className="form-control"
                  value={number2}
                  readOnly
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={calculateSum1}
                disabled={loading}
              >
                {loading ? "Calcul..." : "Calculer la somme (view)"}
              </button>
              
              {result1 !== null && (
                <div className="result-display">
                  <h4 className="result-title">Résultat</h4>
                  <p className="result-value">{result1}</p>
                </div>
              )}
            </div>

            <div className="section-card">
              <h3 className="section-title">Somme Personnalisée</h3>
              <div className="form-group">
                <label className="form-label">Nombre 1:</label>
                <input
                  type="number"
                  className="form-control"
                  value={number1}
                  onChange={(e) => setNumber1(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nombre 2:</label>
                <input
                  type="number"
                  className="form-control"
                  value={number2}
                  onChange={(e) => setNumber2(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={calculateSum2}
                disabled={loading}
              >
                {loading ? "Calcul..." : "Calculer la somme (pure)"}
              </button>
              
              {result2 !== null && (
                <div className="result-display">
                  <h4 className="result-title">Résultat</h4>
                  <p className="result-value">{result2}</p>
                </div>
              )}
            </div>
          </div>

          {lastTx && <TransactionInfo transaction={lastTx} />}
        </div>
      </div>
    </div>
  );
}

export default Exercise1;