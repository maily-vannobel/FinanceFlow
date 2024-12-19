import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import axios from "axios";

const createBudget = () => {
  const { user } = useAuth(); // Récupérer l'utilisateur connecté via le contexte
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Champs pour les données de création de budget
  const [formData, setFormData] = useState({
    amount_limit: "",
    period: "mensuel", // Valeur par défaut
    start_date: "",
    end_date: "",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1, // Mois actuel
  });

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction pour valider les données avant l'envoi
  const validateFormData = () => {
    const { amount_limit, period, start_date, end_date, year, month } = formData;

    if (!amount_limit || amount_limit <= 0) {
      return "Le montant limite doit être un nombre positif.";
    }

    if (!["mensuel", "annuel"].includes(period)) {
      return "La période doit être 'mensuel' ou 'annuel'.";
    }

    if (!start_date || !end_date) {
      return "Les dates de début et de fin doivent être renseignées.";
    }

    if (new Date(start_date) > new Date(end_date)) {
      return "La date de début ne peut pas être après la date de fin.";
    }

    if (!year || year.toString().length !== 4) {
      return "L'année doit être un entier à 4 chiffres.";
    }

    if (!month || month < 1 || month > 12) {
      return "Le mois doit être un entier entre 1 et 12.";
    }

    return null; // Aucune erreur
  };

  // Fonction pour envoyer la requête au backend
  const createBudgets = async () => {
    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/create_budget",
        { ...formData, user_id: user.user_id }, // Ajouter l'ID utilisateur
        { withCredentials: true } // Inclure les cookies pour l'authentification
      );

      setSuccess("Budget créé avec succès !");
      setError(null);
      setFormData((prev) => ({
        ...prev,
        amount_limit: "",
        start_date: "",
        end_date: "",
      })); // Réinitialiser certains champs
    } catch (err) {
      console.error("Erreur lors de la création du budget :", err);
      setError(err.response?.data?.error || "Erreur lors de la création du budget.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Créer un nouveau budget</h1>

      {/* Champ pour le montant limite */}
      <div>
        <label>Montant limite (€) :</label>
        <input
          type="number"
          name="amount_limit"
          value={formData.amount_limit}
          onChange={handleInputChange}
          placeholder="Entrez le montant limite"
        />
      </div>

      {/* Champ pour la période */}
      <div>
        <label>Période :</label>
        <select name="period" value={formData.period} onChange={handleInputChange}>
          <option value="mensuel">Mensuel</option>
          <option value="annuel">Annuel</option>
        </select>
      </div>

      {/* Champ pour les dates */}
      <div>
        <label>Date de début :</label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date de fin :</label>
        <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} />
      </div>

      {/* Champ pour l'année */}
      <div>
        <label>Année :</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          placeholder="Entrez l'année"
        />
      </div>

      {/* Champ pour le mois */}
      <div>
        <label>Mois :</label>
        <input
          type="number"
          name="month"
          value={formData.month}
          onChange={handleInputChange}
          placeholder="Entrez le mois (1-12)"
        />
      </div>

      {/* Bouton pour créer un budget */}
      <button onClick={createBudgets} disabled={loading}>
        {loading ? "Chargement..." : "Créer un budget"}
      </button>

      {/* Affichage des messages */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default createBudget;
