import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loadContract from "../utils/loadContract";
import TransactionInfo from "../components/TransactionInfo";
import "./Exercise.css";

function Exercise7() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [shapeInfo, setShapeInfo] = useState("");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ lo: 0, la: 0 });
  const [surface, setSurface] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { contract, account } = await loadContract("Rectangle");
        setContract(contract);
        setAccount(account);
        
        const info = await contract.methods.afficheInfos().call();
        setShapeInfo(info);
        
        const xy = await contract.methods.afficheXY().call();
        setCoordinates({ 
          x: Number(xy[0]), 
          y: Number(xy[1]) 
        });
        
        const lola = await contract.methods.afficheLoLa().call();
        setDimensions({ 
          lo: Number(lola[0]), 
          la: Number(lola[1]) 
        });
        
        const s = await contract.methods.surface().call();
        setSurface(Number(s));
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    init();
  }, []);

  const moveShape = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const tx = await contract.methods.deplacerForme(
        Number(coordinates.x),
        Number(coordinates.y)
      ).send({ from: account });
      setLastTx(tx);
      
      const xy = await contract.methods.afficheXY().call();
      setCoordinates({ 
        x: Number(xy[0]), 
        y: Number(xy[1]) 
      });
    } catch (error) {
      console.error("Move shape error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exercise-page">
      <div className="exercise-main">
        <div className="exercise-container">
          <div className="exercise-header">
            <h2>Exercice 7: Rectangle (POO)</h2>
            <Link to="/" className="back-link">
               Retour à l'accueil
            </Link>
          </div>

          <div className="exercise-content">
            <div className="section-card">
              <h3 className="section-title">Informations du Rectangle</h3>
              <div className="shape-info">
                <p><strong>Type:</strong> {shapeInfo}</p>
                <p><strong>Position:</strong> ({coordinates.x}, {coordinates.y})</p>
                <p><strong>Dimensions:</strong> {dimensions.lo} x {dimensions.la}</p>
                <p><strong>Surface:</strong> {surface}</p>
              </div>
            </div>

            <div className="section-card">
              <h3 className="section-title">Déplacer le Rectangle</h3>
              <div className="form-group">
                <label className="form-label">Nouveau X:</label>
                <input
                  type="number"
                  className="form-control"
                  value={coordinates.x}
                  onChange={(e) => setCoordinates({...coordinates, x: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nouveau Y:</label>
                <input
                  type="number"
                  className="form-control"
                  value={coordinates.y}
                  onChange={(e) => setCoordinates({...coordinates, y: e.target.value})}
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={moveShape}
                disabled={loading}
              >
                {loading ? "Déplacement..." : "Déplacer"}
              </button>
            </div>
          </div>

          {lastTx && <TransactionInfo transaction={lastTx} />}
        </div>
      </div>
    </div>
  );
}

export default Exercise7;