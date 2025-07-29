import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ account }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛠</span>
          <span className="brand-text">dApp TP3 Blockchain</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;