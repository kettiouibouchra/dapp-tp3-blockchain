import { Link } from "react-router-dom";

function ExerciseCard({ exerciseNum }) {
  const titles = {
    1: "Somme de deux variables",
    2: "Conversion des cryptomonnaies",
    3: "Traitement des chaînes de caractères",
    4: "Tester le signe d'un nombre",
    5: "Tester la parité d'un nombre",
    6: "Gestion des tableaux",
    7: "Programmation Orientée Objet",
    8: "Gestion des paiements"
  };

  const colors = [
    "#3498db", "#2ecc71", "#e74c3c", "#f39c12", 
    "#9b59b6", "#1abc9c", "#d35400", "#34495e"
  ];

  return (
    <div 
      className="exercise-card"
      style={{ borderTopColor: colors[exerciseNum - 1] }}
    >
      <div className="exercise-number">Exercice {exerciseNum}</div>
      <h3>{titles[exerciseNum]}</h3>
      <Link 
        to={`/exercise${exerciseNum}`} 
        className="exercise-link"
        style={{ backgroundColor: colors[exerciseNum - 1] }}
      >
        Accéder
      </Link>
    </div>
  );
}

export default ExerciseCard;