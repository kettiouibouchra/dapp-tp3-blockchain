import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loadContract from "../utils/loadContract";
import TransactionInfo from "../components/TransactionInfo";
import "./Exercise.css";

function Exercise2() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [etherAmount, setEtherAmount] = useState("");
  const [weiAmount, setWeiAmount] = useState("");
  const [conversionResult, setConversionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { contract, account } = await loadContract("Exercice2");
        setContract(contract);
        setAccount(account);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    init();
  }, []);

  const convertEtherToWei = async () => {
    if (!contract || !etherAmount) return;
    setLoading(true);
    try {
      const result = await contract.methods.etherEnWei(etherAmount).call();
      setConversionResult({
        type: "etherToWei",
        from: etherAmount,
        to: result,
        message: `${etherAmount} ETH = ${result} WEI`
      });
    } catch (error) {
      console.error("Conversion error:", error);
    } finally {
      setLoading(false);
    }
  };

  const convertWeiToEther = async () => {
    if (!contract || !weiAmount) return;
    setLoading(true);
    try {
      const result = await contract.methods.weiEnEther(weiAmount).call();
      setConversionResult({
        type: "weiToEther",
        from: weiAmount,
        to: result,
        message: `${weiAmount} WEI = ${result} ETH`
      });
    } catch (error) {
      console.error("Conversion error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exercise-page">
      <div className="exercise-main">
        <div className="exercise-container">
          <div className="exercise-header">
            <h2>Exercice 2: Conversion de Devises</h2>
            <Link to="/" className="back-link">
              ← Retour à l'accueil
            </Link>
          </div>

          <div className="exercise-content">
            <div className="section-card">
              <h3 className="section-title">Ether vers Wei</h3>
              <div className="form-group">
                <label className="form-label">Montant en Ether:</label>
                <input
                  type="number"
                  className="form-control"
                  value={etherAmount}
                  onChange={(e) => setEtherAmount(e.target.value)}
                  step="0.000000000000000001"
                  min="0"
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={convertEtherToWei}
                disabled={loading}
              >
                {loading ? "Conversion..." : "Convertir en Wei"}
              </button>
            </div>

            <div className="section-card">
              <h3 className="section-title">Wei vers Ether</h3>
              <div className="form-group">
                <label className="form-label">Montant en Wei:</label>
                <input
                  type="number"
                  className="form-control"
                  value={weiAmount}
                  onChange={(e) => setWeiAmount(e.target.value)}
                  min="0"
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={convertWeiToEther}
                disabled={loading}
              >
                {loading ? "Conversion..." : "Convertir en Ether"}
              </button>
            </div>

            {conversionResult && (
              <div className="result-display">
                <h4 className="result-title">Résultat de Conversion</h4>
                <p className="result-value">{conversionResult.message}</p>
                <div className="conversion-details">
                  <p>
                    <span className="detail-label">Type:</span> 
                    <span>{conversionResult.type === "etherToWei" ? "Ether → Wei" : "Wei → Ether"}</span>
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

export default Exercise2;