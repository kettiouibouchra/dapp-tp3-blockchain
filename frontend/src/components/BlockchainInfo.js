import React, { useEffect, useState } from "react";
import Web3 from "web3";

function BlockchainInfo({ web3, account }) {
  const [networkInfo, setNetworkInfo] = useState({
    url: "Chargement...",
    id: "Chargement..."
  });
  const [lastBlock, setLastBlock] = useState({
  number: "Chargement...",
  hash: "Chargement...",
  fullHash: "",
  timestamp: "Chargement...",
  parentHash: "Chargement...",
  fullParentHash: "",
  transactions: "Chargement...",
  fullMiner: ""
});
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!web3) return;
      
      try {
        setLoading(true);
        
        const networkId = await web3.eth.net.getId();
        const block = await web3.eth.getBlock("latest");
        
        setLastBlock({
          number: block.number.toString(),
          hash: `${block.hash.substring(0, 10)}...${block.hash.substring(block.hash.length - 6)}`,
          fullHash: block.hash,
          timestamp: new Date(Number(block.timestamp) * 1000).toLocaleString(),
          parentHash: `${block.parentHash.substring(0, 10)}...${block.parentHash.substring(block.parentHash.length - 6)}`,
          fullParentHash: block.parentHash,
          transactions: block.transactions?.length.toString() || "0",
         fullMiner: block.miner
        });
        
        setNetworkInfo({
          url: "HTTP://127.0.0.1:7545",
          id: networkId.toString()
        });

        setUpdated(true);
        setTimeout(() => setUpdated(false), 1500);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
        setNetworkInfo({
          url: "Erreur",
          id: "Erreur"
        });
        setLastBlock({
          number: "Erreur",
          hash: "Erreur",
          timestamp: "Erreur",
          transactions: "Erreur"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadBlockchainData();
    
    const interval = setInterval(loadBlockchainData, 5000);
    return () => clearInterval(interval);
  }, [web3]);

  return (
    <div className={`blockchain-info ${updated ? "updated" : ""}`}>
      <h3>
        <span className="info-icon"></span>
        Informations de la Blockchain
        {loading && <span className="loading-spinner"></span>}
      </h3>
      <div className="info-grid">
        <div className="info-section">
          <h4>
            <span className="section-icon">🌐</span>
            Réseau
          </h4>
          <div className="info-item">
            <span className="info-label">URL:</span>
            <span className="info-value" title={networkInfo.url}>
              {networkInfo.url}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">ID:</span>
            <span className="info-value">{networkInfo.id}</span>
          </div>
        </div>
        
        <div className="info-section">
          <h4>
            <span className="section-icon">🧱</span>
            Dernier Bloc
          </h4>
          <div className="info-item">
            <span className="info-label">N°:</span>
            <span className="info-value">#{lastBlock.number}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Hash:</span>
            <span className="info-value" title={lastBlock.hash}>
              {lastBlock.hash}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Timestamp:</span>
            <span className="info-value">{lastBlock.timestamp}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Parent Hash:</span>
            <span className="info-value" title={lastBlock.fullParentHash || lastBlock.parentHash}>
                {lastBlock.parentHash || "Chargement..."}
            </span>
        </div>
        <div className="info-item">
           <span className="info-label">Transactions:</span>
           <span className="info-value">{lastBlock.transactions}</span>
        </div>
    </div>
        
        <div className="info-section">
          <h4>
            <span className="section-icon">👤</span>
            Compte
          </h4>
          <div className="info-item">
            <span className="info-label">Connecté:</span>
            <span className="info-value account-address" title={account}>
              {account ? `${account.substring(0, 6)}...${account.substring(38)}` : "Non connecté"}
            </span>
          </div>
          {account && (
            <div className="info-item">
              <span className="info-label">Transactions:</span>
              <span className="info-value">{lastBlock.transactions}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlockchainInfo;