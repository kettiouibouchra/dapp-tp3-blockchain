function TransactionInfo({ transaction }) {
  if (!transaction) return null;

  return (
    <div className="transaction-info">
      <h3>Détails de la transaction</h3>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Hash:</span>
          <span className="info-value truncated">{transaction.transactionHash}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Block:</span>
          <span className="info-value">{transaction.blockNumber}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Gas utilisé:</span>
          <span className="info-value">{transaction.gasUsed}</span>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfo;