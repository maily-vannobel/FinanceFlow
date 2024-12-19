import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import axios from "axios";

const UpdateBudget = ({ budget, onUpdateSuccess, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ ...budget });
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

    // Pour voir ce qui est envouer dans le formulaire : on est ok
    console.log("Payload envoyé :", { ...formData, id: budget.budget_id, user_id: user.user_id });
    try {
      const response = await axios.post(`http://localhost:8000/update_budget`, {
        ...formData, // Toutes les données du formulaire
        id: budget.budget_id, // Correction ici : id au lieu de budget_id
        user_id: user.user_id,
      });

      if (response.status === 200 && response.data.success) {
        onUpdateSuccess({ ...formData, budget_id: budget.budget_id });
        setError(null);
      } else {
        throw new Error(response.data.error || "Erreur inconnue lors de la mise à jour.");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du budget :", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Modifier le budget</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Montant limite :</label>
        <input
          type="number"
          name="amount_limit"
          value={formData.amount_limit}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Période :</label>
        <input type="text" name="period" value={formData.period} onChange={handleChange} />
      </div>
      <div>
        <label>Date de début :</label>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
      </div>
      <div>
        <label>Date de fin :</label>
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} />
      </div>
      <div>
        <label>Année :</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} />
      </div>
      <div>
        <label>Mois :</label>
        <input type="number" name="month" value={formData.month} onChange={handleChange} />
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

export default UpdateBudget;
