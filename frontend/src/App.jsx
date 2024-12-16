import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LoyaltyCards from "./components/LoyaltyCards";
// import "./App.css";

// Composant principal de l'application
function App() {
  return (
    <>
      <div>
        {/* Menu de navigation avec des liens vers les différentes pages */}
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/register">Inscription</Link>
            </li>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/loyalty-cards">Les cartes de fidélité</Link>
            </li>
          </ul>
        </nav>
        {/* Définition des routes pour l'application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loyalty-cards" element={<LoyaltyCards />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
