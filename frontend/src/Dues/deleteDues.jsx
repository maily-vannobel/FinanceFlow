import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import axios from "axios";

const DeleteDue = ({ dueId, onDeleteSuccess }) => {
  const { user } = useAuth(); // Récupérer l'utilisateur du contexte
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour supprimer une dette
  const deleteDue = async () => {
    if (!user || !user.user_id) {
      setError("Aucun utilisateur connecté");
      return;
    }

    setLoading(true);
    try {
      // Envoyer la requête DELETE avec le paramètre 'due_id' dans l'URL
      const response = await axios.delete(`http://localhost:8000/delete_dues?due_id=${dueId}`, {
        withCredentials: true, // Pour les cookies si nécessaire
      });

      if (response.data.success) {
        // Callback pour mettre à jour la liste des dettes dans le parent
        onDeleteSuccess(dueId);
        setError(null);
      } else {
        setError("Erreur lors de la suppression de la dette.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de la dette :", err);
      setError("Erreur lors de la suppression de la dette.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={deleteDue} disabled={loading}>
        {loading ? "Suppression en cours..." : "Supprimer"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteDue;
