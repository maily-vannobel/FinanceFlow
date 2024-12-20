import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import axios from "axios";

const CreateDue = () => {
  const { user } = useAuth(); // Récupérer l'utilisateur connecté via le contexte
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Champs pour les données de création de dette
  const [formData, setFormData] = useState({
    description: "",
    initial_amount: "",
    start_date: "",
    due_date: "",
    is_paid: false, // Valeur par défaut
  });

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gérer le changement pour le champ "is_paid" (checkbox)
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Fonction pour valider les données avant l'envoi
  const validateFormData = () => {
    const { description, initial_amount, start_date, due_date } = formData;

    if (!description) {
      return "La description est obligatoire.";
    }

    if (!initial_amount || initial_amount <= 0) {
      return "Le montant initial doit être un nombre positif.";
    }

    if (!start_date || !due_date) {
      return "Les dates de début et d'échéance doivent être renseignées.";
    }

    if (new Date(start_date) > new Date(due_date)) {
      return "La date de début ne peut pas être après la date d'échéance.";
    }

    return null; // Aucune erreur
  };

  // Fonction pour envoyer la requête au backend
  const createDue = async () => {
    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      setSuccess(null);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/create_dues", // Endpoint pour créer une dette
        { ...formData, user_id: user.user_id }, // Ajouter l'ID utilisateur
        { withCredentials: true } // Inclure les cookies pour l'authentification
      );

      setSuccess("Dette créée avec succès !");
      setError(null);
      setFormData({
        description: "",
        initial_amount: "",
        start_date: "",
        due_date: "",
        is_paid: false,
      }); // Réinitialiser les champs
    } catch (err) {
      console.error("Erreur lors de la création de la dette :", err);
      setError(err.response?.data?.error || "Erreur lors de la création de la dette.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Créer une nouvelle dette</h1>

      {/* Champ pour la description */}
      <div>
        <label>Description :</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Entrez une description"
        />
      </div>

      {/* Champ pour le montant initial */}
      <div>
        <label>Montant initial (€) :</label>
        <input
          type="number"
          name="initial_amount"
          value={formData.initial_amount}
          onChange={handleInputChange}
          placeholder="Entrez le montant initial"
        />
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
        <label>Date d'échéance :</label>
        <input type="date" name="due_date" value={formData.due_date} onChange={handleInputChange} />
      </div>

      {/* Champ pour indiquer si la dette est payée */}
      <div>
        <label>
          <input
            type="checkbox"
            name="is_paid"
            checked={formData.is_paid}
            onChange={handleCheckboxChange}
          />
          Payée
        </label>
      </div>

      {/* Bouton pour créer une dette */}
      <button onClick={createDue} disabled={loading}>
        {loading ? "Chargement..." : "Créer une dette"}
      </button>

      {/* Affichage des messages */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateDue;
