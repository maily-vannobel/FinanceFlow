import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

import CreateDue from "../Dues/CreateDues"; // Composant pour créer une dette
import DeleteDue from "../Dues/DeleteDues"; // Composant pour supprimer une dette
import UpdateDue from "../Dues/UpdateDues"; // Composant pour mettre à jour une dette

const ReadDues = () => {
  const { user } = useAuth(); // Récupérer l'utilisateur connecté du contexte
  const [dues, setDues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [showCreateDue, setShowCreateDue] = useState(false); // Contrôle de l'affichage du formulaire
  const [editingDueId, setEditingDueId] = useState(null); // Dette en cours d'édition

  useEffect(() => {
    if (user && user.user_id) {
      readDues();
    }
  }, [user]);

  //* GET : Fonction pour lire toutes les dettes de l'utilisateur connecté
  const readDues = async () => {
    if (!user || !user.user_id) {
      setError("Aucun utilisateur connecté");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/read_dues_by_id", {
        params: { user_id: user.user_id }, // Passer l'ID de l'utilisateur connecté
        withCredentials: true,
      });
      setDues(response.data.dues || []);
      setError(null);
      setSuccess(null);
    } catch (err) {
      console.error("Error fetching dues:", err);
      setError(err.response?.data?.error || "Erreur lors de la récupération des dettes");
      setDues([]);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour mettre à jour la liste des dettes après suppression
  const handleDeleteSuccess = (dueId) => {
    setDues((prev) => prev.filter((due) => due.due_id !== dueId));
  };

  // Fonction appelée après une mise à jour réussie
  const handleUpdateSuccess = (updatedDue) => {
    setDues((prev) => prev.map((due) => (due.due_id === updatedDue.due_id ? updatedDue : due)));
    setEditingDueId(null); // Fermer le formulaire d'édition
  };

  // Fonction pour annuler l'édition
  const handleCancelEdit = () => {
    setEditingDueId(null);
  };

  return (
    <div>
      <h1>Les dettes</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Utilisateur connecté : {user?.user_id}</p>

      {/* Section pour afficher les dettes de l'utilisateur */}
      <section>
        <ul>
          {dues.length > 0 ? (
            dues.map((due) => (
              <li key={due.due_id}>
                <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                  {editingDueId === due.due_id ? (
                    // Formulaire de mise à jour
                    <div>
                      <UpdateDue
                        due={due}
                        onCancel={handleCancelEdit}
                        onUpdateSuccess={handleUpdateSuccess}
                      />
                      <button onClick={handleCancelEdit} style={{ marginTop: "10px" }}>
                        Annuler
                      </button>
                    </div>
                  ) : (
                    // Affichage des détails de la dette
                    <>
                      <p>Description : {due.description}</p>
                      <p>Montant initial : {due.initial_amount}</p>
                      <p>Date de début : {due.start_date}</p>
                      <p>Date d'échéance : {due.due_date}</p>
                      <p>Payée : {due.is_paid ? "Oui" : "Non"}</p>

                      {/* Bouton pour éditer */}
                      <button onClick={() => setEditingDueId(due.due_id)}>Modifier</button>

                      {/* Section pour supprimer une dette */}
                      <DeleteDue dueId={due.due_id} onDeleteSuccess={handleDeleteSuccess} />
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>Aucune dette trouvée.</p>
          )}
        </ul>
      </section>

      {/* Section pour créer une nouvelle dette */}
      <section>
        <div>
          <button onClick={() => setShowCreateDue(!showCreateDue)}>
            {showCreateDue ? "Annuler la création" : "Créer une nouvelle dette"}
          </button>
        </div>
        {showCreateDue && (
          <div>
            <CreateDue />
          </div>
        )}
      </section>
    </div>
  );
};

export default ReadDues;
