import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

import CreateBudget from "../Budgets/createBudget";

const readBudget = () => {
  const { user } = useAuth(); // Récupérer l'utilisateur du contexte
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [showCreateBudget, setShowCreateBudget] = useState(false); // Contrôle de l'affichage du formulaire

  useEffect(() => {
    if (user && user.user_id) {
      readBudgets();
    }
  }, [user]); // Effectue l'appel chaque fois que l'utilisateur change

  //* GET : Fonction pour lire tous les budgets de l'utilisateur connecté
  const readBudgets = async () => {
    console.log(user); // Vérifier que l'utilisateur est correctement récupéré
    if (!user || !user.user_id) {
      setError("Aucun utilisateur connecté");
      return;
    }

    setLoading(true);
    // Débbuger chemiin de la requête
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
      {/* Crée une boucle pour faire apparaitre tous les budgets dans una card */}
      <h1>Les budgets</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Utilisateur connecté : {user.user_id}</p>
      {/* Section pour afficher les budgets de l'utilisateurs */}
      <section>
        <ul>
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <li key={budget.budget_id}>
                {budget.amount_limit}
                <p>Montant limite : {budget.amount_limit}</p>
                <p>Période : {budget.period}</p>
                <p>Date de début : {budget.start_date}</p>
                <p>Date de fin : {budget.end_date}</p>
                {/* Section pour mettre à jour un budget */}
                <button >Mettre à jour le budget</button>

                {/* Section pour supprimer un budget */}
                <button >Supprimer le budget</button>
              </li>
            ))
          ) : (
            <p>Aucun budget trouvé.</p>
          )}
        </ul>
      </section>

      <section>
        {/* Section pour crée un nouveau budget */}
        <div>
          <button onClick={() => setShowCreateBudget(!showCreateBudget)}>
            {showCreateBudget ? "Annuler la création" : "Créer un nouveau budget"}
          </button>
        </div>
        {/* Affichage conditionnel du formulaire de création */}
        {showCreateBudget && (
          <div>
            <CreateBudget />
          </div>
        )}
      </section>
    </div>
  );
};

export default readBudget;
