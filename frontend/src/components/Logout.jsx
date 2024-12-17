import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// La fonction 'Logout' utilise 'useNavigate' pour rediriger l'utilisateur vers la page de connexion après la déconnection
const Logout = () => {
  const navigate = useNavigate();
  // handleLogout gére la déconnexion, si la réponse du backend est positive, Les cookies d'utilisateur seront supprimés
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/logout",
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        Cookies.remove("currentUserId");
        alert("Déconnexion réussi !");
        navigate("/login");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnection:", error);
    }
  };
  return <button onClick={handleLogout}>Déconnexion</button>;
};

export default Logout;