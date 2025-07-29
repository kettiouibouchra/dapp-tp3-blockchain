import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loadContract from "../utils/loadContract";
import TransactionInfo from "../components/TransactionInfo";
import "./Exercise.css";

function Exercise6() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [index, setIndex] = useState("");
  const [array, setArray] = useState([]);
  const [sum, setSum] = useState(null);
  const [element, setElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { contract, account } = await loadContract("Exercice6");
        setContract(contract);
        setAccount(account);
        
        const arr = await contract.methods.afficheTableau().call();
        setArray(arr.map(Number));
        
        const s = await contract.methods.calculerSomme().call();
        setSum(Number(s));
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    init();
  }, []);

  const addNumber = async () => {
    if (!contract || !newNumber) return;
    setLoading(true);
    try {
      const tx = await contract.methods.ajouterNombre(parseInt(newNumber))
        .send({ from: account });
      setLastTx(tx);
      
      const arr = await contract.methods.afficheTableau().call();
      setArray(arr.map(Number));
      
      const s = await contract.methods.calculerSomme().call();
      setSum(Number(s));
      
      setNewNumber("");
    } catch (error) {
      console.error("Add number error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getElement = async () => {
    if (!contract || index === "") return;
    setLoading(true);
    try {
      const el = await contract.methods.getElement(parseInt(index)).call();
      setElement(Number(el));
    } catch (error) {
      console.error("Get element error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exercise-page">
      <div className="exercise-main">
        <div className="exercise-container">
          <div className="exercise-header">
            <h2>Exercice 6: Gestion des Tableaux</h2>
            <Link to="/" className="back-link">
              Retour à l'accueil
            </Link>
          </div>

          <div className="exercise-content">
            <div className="section-card">
              <h3 className="section-title">Ajouter un Nombre</h3>
              <div className="form-group">
                <label className="form-label">Nouveau nombre:</label>
                <input
                  type="number"
                  className="form-control"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={addNumber}
                disabled={loading}
              >
                {loading ? "Ajout..." : "Ajouter au Tableau"}
              </button>
            </div>

            <div className="section-card">
              <h3 className="section-title">Récupérer un Élément</h3>
              <div className="form-group">
                <label className="form-label">Index:</label>
                <input
                  type="number"
                  className="form-control"
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  min="0"
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={getElement}
                disabled={loading}
              >
                {loading ? "Recherche..." : "Récupérer l'Élément"}
              </button>
              
              {element !== null && (
                <div className="result-mini">
                  <p>Élément à l'index {index}: <strong>{element}</strong></p>
                </div>
              )}
            </div>

            <div className="section-card full-width">
              <h3 className="section-title">Tableau et Somme</h3>
              <div className="array-display">
                <p>Tableau: [{array.join(", ")}]</p>
                <p>Nombre d'éléments: <strong>{array.length}</strong></p>
                <p>Somme des éléments: <strong>{sum !== null ? sum : "Chargement..."}</strong></p>
              </div>
            </div>
          </div>

          {lastTx && <TransactionInfo transaction={lastTx} />}
        </div>
      </div>
    </div>
  );
}

export default Exercise6;