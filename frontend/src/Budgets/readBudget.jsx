import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

import CreateBudget from "../Budgets/createBudget";
import DeleteBudget from "../Budgets/deleteBudget";
import UpdateBudget from "../Budgets/updateBudget";

const readBudget = () => {
  const { user } = useAuth(); // Récupérer l'utilisateur du contexte
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [showCreateBudget, setShowCreateBudget] = useState(false); // Contrôle de l'affichage du formulaire
  const [editingBudgetId, setEditingBudgetId] = useState(null); // Budget en cours d'édition

  useEffect(() => {
    if (user && user.user_id) {
      readBudgets();
    }
  }, [user]); // Effectue l'appel chaque fois que l'utilisateur change

  //* GET : Fonction pour lire tous les budgets de l'utilisateur connecté
  const readBudgets = async () => {
    if (!user || !user.user_id) {
      setError("Aucun utilisateur connecté");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/read_budget_by_id", {
        params: { user_id: user.user_id }, // Passer l'ID de l'utilisateur connecté
        withCredentials: true,
      });
      setBudgets(response.data.budgets || []);
      setError(null);
      setSuccess(null);
    } catch (err) {
      console.error("Error fetching budgets:", err);
      setError(err.response?.data?.error || "Erreur lors de la récupération des budgets");
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour mettre à jour la liste des budgets après suppression
  const handleDeleteSuccess = (budgetId) => {
    setBudgets((prev) => prev.filter((budget) => budget.budget_id !== budgetId));
  };

  // Fonction appelée après une mise à jour réussie
  const handleUpdateSuccess = (updatedBudget) => {
    setBudgets((prev) =>
      prev.map((budget) => (budget.budget_id === updatedBudget.budget_id ? updatedBudget : budget))
    );
    setEditingBudgetId(null); // Fermer le formulaire d'édition
  };

  // Fonction pour annuler l'édition
  const handleCancelEdit = () => {
    setEditingBudgetId(null);
  };

  return (
    <div>
      <h1>Les budgets</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Utilisateur connecté : {user.user_id}</p>

      {/* Section pour afficher les budgets de l'utilisateur */}
      <section>
        <ul>
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <li key={budget.budget_id}>
                <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                  {editingBudgetId === budget.budget_id ? (
                    // Formulaire de mise à jour
                    <div>
                      <UpdateBudget
                        budget={budget}
                        onCancel={handleCancelEdit}
                        onUpdateSuccess={handleUpdateSuccess}
                      />
                      {/* Bouton pour annuler l'édition */}
                      <button onClick={handleCancelEdit} style={{ marginTop: "10px" }}>
                        Annuler
                      </button>
                    </div>
                  ) : (
                    // Affichage des détails du budget
                    <>
                      <p>Montant limite : {budget.amount_limit}</p>
                      <p>Période : {budget.period}</p>
                      <p>Date de début : {budget.start_date}</p>
                      <p>Date de fin : {budget.end_date}</p>

                      {/* Bouton pour éditer */}
                      <button onClick={() => setEditingBudgetId(budget.budget_id)}>Modifier</button>

                      {/* Section pour supprimer un budget */}
                      <DeleteBudget
                        budgetId={budget.budget_id}
                        onDeleteSuccess={handleDeleteSuccess}
                      />
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>Aucun budget trouvé.</p>
          )}
        </ul>
      </section>

      {/* Section pour créer un nouveau budget */}
      <section>
        <div>
          <button onClick={() => setShowCreateBudget(!showCreateBudget)}>
            {showCreateBudget ? "Annuler la création" : "Créer un nouveau budget"}
          </button>
        </div>
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
