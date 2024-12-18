import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
//Componente qui protège les routes pour empêcher l'access à la page par des utilisateurs non connectés,
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
