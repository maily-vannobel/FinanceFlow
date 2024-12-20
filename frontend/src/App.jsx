import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LoyaltyCards from "./components/LoyaltyCards";
import Budgets from "./components/Budgets";
import Dues from "./components/Dues";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
// import "./App.css";

// Composant principal de l'application
function App() {
  return (
    <AuthProvider>
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
            <li>
              <Link to="/budgets">Les budgets</Link>
            </li>
            <li>
              <Link to="/dues">Les dettes</Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </nav>
        {/* Définition des routes pour l'application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/budgets"
            element={
              <ProtectedRoute>
                <Budgets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dues"
            element={
              <ProtectedRoute>
                <Dues />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loyalty-cards"
            element={
              <ProtectedRoute>
                <LoyaltyCards />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
