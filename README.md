## 📌 Description du projet
Ce projet est une *application décentralisée (dApp)* réalisée dans le cadre du *module Blockchain & Web3* du Master GLCC (S2).  
L’objectif est de développer une interface interactive permettant d’exécuter et de tester *huit contrats intelligents Solidity* couvrant différents concepts du langage.

L’application utilise *Truffle, **Ganache, **ReactJS* et *Web3.js* pour offrir une expérience complète allant de l’écriture des smart contracts à leur interaction via une interface web.

---

## 🚀 Fonctionnalités principales
✅ 8 contrats intelligents (un pour chaque exercice du TP3)  
✅ Interface React avec navigation (React Router)  
✅ Connexion à une blockchain locale via *Ganache*  
✅ Appels en lecture (.call()) et en écriture (.send()) sur les contrats  
✅ Suivi des informations blockchain (dernier bloc, compte connecté, détails des transactions)  
✅ Code organisé et structuré (frontend + smart contracts)

---

## 🛠️ Technologies utilisées
- *Solidity 0.8+* – pour le développement des smart contracts  
- *Truffle Suite* – pour la compilation, migration et tests des contrats  
- *Ganache* – pour exécuter une blockchain Ethereum locale  
- *Web3.js* – pour connecter React aux contrats déployés  
- *ReactJS* – pour le frontend interactif  
- *React Bootstrap* – pour une interface moderne et responsive  
- *VS Code* – IDE principal du projet  
- *Git & GitHub* – gestion de versions et collaboration  

---

## 📂 Structure du projet
dapp-tp3/
├── contracts/ # Tous les contrats Solidity (Exercice1.sol … Exercice8.sol)
├── migrations/ # Scripts de déploiement Truffle
├── test/ # (Facultatif) Tests Truffle
├── tp3-frontend/ # Frontend React
│ ├── src/
│ │ ├── components/ # Navbar, ExerciseCard, BlockchainInfo, TransactionInfo
│ │ ├── exercises/ # Une page par exercice
│ │ └── utils/ # loadContract.js et fonctions utilitaires
│ ├── public/
│ └── package.json
├── truffle-config.js
└── README.md


## ⚙️ Installation et exécution

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/votre-utilisateur/dapp-tp3.git
cd dapp-tp3
2️⃣ Installer les dépendances Truffle et React
bash
Copy code
npm install -g truffle
cd tp3-frontend
npm install
3️⃣ Lancer Ganache
Démarre Ganache GUI ou exécute ganache-cli sur le port 7545.

4️⃣ Compiler et déployer les contrats
bash
Copy code
truffle compile
truffle migrate --reset
5️⃣ Lancer le frontend React
bash
Copy code
cd tp3-frontend
npm start
✅ Le frontend est accessible sur http://localhost:3000

📜 Contrats inclus
Exercice 1 : Fonctions de base (addition)

Exercice 2 : Conversion Ether ↔ Wei

Exercice 3 : Manipulation de chaînes (concaténation, comparaison)

Exercice 4 : Vérification d’un nombre positif

Exercice 5 : Vérification de la parité d’un nombre

Exercice 6 : Gestion d’un tableau dynamique de nombres

Exercice 7 : Héritage et abstraction (Forme & Rectangle)

Exercice 8 : Gestion de paiements (envoi et retrait d’Ether)

📷 Captures d’écran
Page d’accueil avec les 8 exercices sous forme de cartes.
