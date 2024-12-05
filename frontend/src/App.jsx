import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        {/* Définition des routes pour l'application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
