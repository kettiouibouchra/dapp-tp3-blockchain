import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loadContract from "../utils/loadContract";
import "./Exercise.css";

function Exercise4() {
  const [contract, setContract] = useState(null);
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { contract } = await loadContract("Exercice4");
        setContract(contract);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    init();
  }, []);

  const checkSign = async () => {
    if (!contract || !number) return;
    setLoading(true);
    try {
      const isPositive = await contract.methods.estPositif(parseInt(number)).call();
      setResult({
        number,
        isPositive,
        message: `Le nombre ${number} est ${isPositive ? "positif" : "négatif ou nul"}`
      });
    } catch (error) {
      console.error("Check sign error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exercise-page">
      <div className="exercise-main">
        <div className="exercise-container">
          <div className="exercise-header">
            <h2>Exercice 4: Vérification de Signe</h2>
            <Link to="/" className="back-link">
               Retour à l'accueil
            </Link>
          </div>

          <div className="exercise-content">
            <div className="section-card">
              <h3 className="section-title">Entrez un nombre</h3>
              <div className="form-group">
                <label className="form-label">Nombre:</label>
                <input
                  type="number"
                  className="form-control"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={checkSign}
                disabled={loading}
              >
                {loading ? "Vérification..." : "Vérifier le Signe"}
              </button>
            </div>

            {result && (
              <div className="result-display">
                <h4 className="result-title">Résultat</h4>
                <p className={`result-value ${result.isPositive ? "positive" : "negative"}`}>
                  {result.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exercise4;