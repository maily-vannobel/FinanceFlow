import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import axios from "axios";

const DeleteBudget = ({ budgetId, onDeleteSuccess }) => {
  const { user } = useAuth(); // Récupérer l'utilisateur du contexte
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour supprimer un budget
  const deleteBudgets = async () => {
    if (!user || !user.user_id) {
      setError("Aucun utilisateur connecté");
      return;
    }

    setLoading(true);
    try {
      // Envoyer la requête DELETE avec le paramètre 'budget_id' dans l'URL
      const response = await axios.delete(
        `http://localhost:8000/delete_budget?budget_id=${budgetId}`,
        {
          withCredentials: true, // Pour les cookies si nécessaire
        }
      );

      if (response.data.success) {
        // Callback pour mettre à jour la liste des budgets dans le parent
        onDeleteSuccess(budgetId);
        setError(null);
      } else {
        setError("Erreur lors de la suppression du budget.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du budget :", err);
      setError("Erreur lors de la suppression du budget.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={deleteBudgets} disabled={loading}>
        {loading ? "Suppression en cours..." : "Supprimer"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteBudget;
