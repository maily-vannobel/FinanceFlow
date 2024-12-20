import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import axios from "axios";

const UpdateDue = ({ due, onUpdateSuccess, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ ...due });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.user_id) {
      setError("Aucun utilisateur connecté");
      return;
    }

    setLoading(true);

    // Pour voir ce qui est envoyé dans le formulaire
    console.log("Payload envoyé :", { ...formData, id: due.due_id, user_id: user.user_id });

    try {
      const response = await axios.post(`http://localhost:8000/update_dues`, {
        ...formData, // Toutes les données du formulaire
        id: due.due_id, // Correction ici : id au lieu de due_id
        user_id: user.user_id,
      });

      if (response.status === 200 && response.data.success) {
        onUpdateSuccess({ ...formData, due_id: due.due_id });
        setError(null);
      } else {
        throw new Error(response.data.error || "Erreur inconnue lors de la mise à jour.");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la dette :", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Modifier la dette</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Montant dû :</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
      </div>
      <div>
        <label>Description :</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date d'échéance :</label>
        <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
      </div>
      <div>
        <label>Status :</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">En attente</option>
          <option value="paid">Payé</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Mise à jour..." : "Mettre à jour"}
      </button>
      <button type="button" onClick={onCancel} disabled={loading}>
        Annuler
      </button>
    </form>
  );
};

export default UpdateDue;
