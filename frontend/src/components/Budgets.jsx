import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Budgets = () => {
  const { user } = useAuth(); // Récupérer l'utilisateur du contexte
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.user_id) {
      fetchBudgets();
    }
  }, [user]); // Effectue l'appel chaque fois que l'utilisateur change

  const fetchBudgets = async () => {
    console.log(user); // Vérifier que l'utilisateur est correctement récupéré
    if (!user || !user.user_id) {
      setError("Aucun utilisateur connecté");
      return;
    }

    setLoading(true);
    console.log(
      `Making request to: http://localhost:8000/read_budget_by_id?user_id=${user.user_id}`
    );
    try {
      const response = await axios.get("http://localhost:8000/read_budget_by_id", {
        params: { user_id: user.user_id }, // Passer l'ID de l'utilisateur connecté
        withCredentials: true,
      });
      setBudgets(response.data.budgets || []);
      setError(null);
      setSuccess(null);
    } catch (err) {
      console.error("Error fetching budgets:", err); // Log l'erreur complète
      if (err.response) {
        console.error("Response error:", err.response.data);
        console.error("Status code:", err.response.status);
      } else if (err.request) {
        console.error("Request error:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
      setError(err.response?.data?.error || "Erreur lors de la récupération des budgets");
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Les budgets</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Utilisateur connecté : {user.user_id}</p>
      <ul>
        {budgets.length > 0 ? (
          budgets.map((budget) => <li key={budget.budget_id}>{budget.amount_limit}</li>)
        ) : (
          <p>Aucun budget trouvé.</p>
        )}
      </ul>
    </div>
  );
};

export default Budgets;
