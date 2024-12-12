import { useState, useEffect } from "react";
import axios from "axios";
import ReactQR from "react-qr-code";
import Barcode from "react-barcode";

//Création d'un component 'LoyaltyCards' avec des états initiaux pour gérer le numéro de carte, les cartes de fidélité et les erreurs
const LoyaltyCards = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardEstablishment, setCardEstablishment] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  //today contient la date actuelle, et il va servir à gérer le calendrier
  const today = new Date().toISOString().split("T")[0];
  //L'identifiant de l'utilisateur est récupéré depuis le stockage local et assigné à une variable
  const currentUserId = localStorage.getItem("currentUserId");
  // useEffect déclenche dès le début le chargement des cartes existantes, et cela ne se fait qu'une seule fois, comme l'indique le tableau vide
  useEffect(() => {
    if (!currentUserId || currentUserId === "undefined") {
      setError("Utilisateur non connecté");
    } else {
      fetchCards();
    }
  }, []);
  //Envoi d'une requête GET a l'endpoint pour récuperer les cartes de fidélité d'un utilisateur, avec gestion des erreurs
  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/getUserCards", {
        params: { user_id: currentUserId },
        withCredentials: true,
      });
      setCards(response.data.cards || []);
      setError(null);
      setSuccess(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "L'erreur lors de la récupération des cartes"
      );
      setCards([]);
    } finally {
      setLoading(false);
    }
  };
  //Envoi d'une requête POST avec le numero de la carte et l'id d'utilisateurs pour ajouter une carte à la base de données
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardNumber.trim() || !cardEstablishment.trim() || !cardExpiryDate) {
      setError(
        "Le numéro de la carte, le title et la date d'expiration sont requis"
      );
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/addCard",
        {
          establishment: cardEstablishment,
          card_number: cardNumber,
          expiry_date: cardExpiryDate,
          user_id: currentUserId,
        },
        { withCredentials: true }
      );
      // Si la réponse du serveur est positive, l'utilisateur recevra une notification,
      //  les cartes seront chargées, et l'état du numéro de carte sera mis à jour dans le state
      if (response.data.success) {
        setSuccess("La carte a été ajouté avec success");
        setError(null);
        fetchCards();
        setCardNumber("");
        setCardEstablishment("");
        setCardExpiryDate("");
      }
    } catch (err) {
      //Récupération du message d'erreur renvoyé par le serveur via axios ou un message d'erreur par défaut si aucune erreur spécifique n'est recu
      const errorMessage =
        err.response?.data?.error || "L'erreur lors de l'ajout de la carte";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUserId) {
    return <p>Veuillez vous connecter pour gérer vos cartes de fidélité.</p>;
  }
  //Cette function envoie une requête DELETE pour supprimer une carte de fidélité choisi par l'utilisateur
  const handleDelete = async (cardNumber) => {
    //L'onglet de la confirmation s'affiche avec le message pour utilisateur
    const confirmDelete = window.confirm(
      "Êtes-vous sûre de vouloir supprimer cette carte?"
    );
    if (!confirmDelete) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.delete("http://localhost:8000/deleteCard", {
        data: { user_id: currentUserId, card_number: cardNumber },
        withCredentials: true,
      });
      if (response.data.success) {
        setSuccess("La carte a été supprimée");
        fetchCards();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        "Erreur lors de la suppression de la carte";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Les Cartes de Fidélité</h2>
      {/* Dans le formulaire, les données seront saisi. Après avoir cliqué sur le bouton, la fonction handleSubmit sera déclenchée
       Si l'utilisateur est connecté, la carte sera enregistrée dans la base de données */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Le numero de la carte"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Le nom de la carte"
          value={cardEstablishment}
          onChange={(e) => setCardEstablishment(e.target.value)}
        />
        <input
          type="date"
          placeholder="La date d'expiration"
          value={cardExpiryDate}
          onChange={(e) => setCardExpiryDate(e.target.value)}
          min={today}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Ajouter une carte"}
        </button>
      </form>
      {error && <p>{error}</p>}
      {/* Les cartes de fidélité disponibles de l'utilisateur seront affichées sur la page, et un code QR sera généré pour chacune d'elles */}
      <h3>Tes cartes:</h3>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {cards.map((card) => (
            <li key={card.card_id}>
              <strong>{card.establishment}</strong>{" "}
              <p>La date d'expiration: {card.expiry_date}</p>
              <br />
              <p>Le numero de la carte: {card.card_number} </p>
              <br />
              {/* Créations des codes-qr et codes-barres à partir du numéro de carte de fidélité  */}
              <ReactQR value={card.card_number} />
              <br />
              <Barcode value={card.card_number} />
              <button type="delete">Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoyaltyCards;
