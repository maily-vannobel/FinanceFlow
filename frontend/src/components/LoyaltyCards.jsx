import { useState, useEffect } from "react";
import axios from "axios";
import ReactQR from "react-qr-code";

//Création d'un component 'LoyaltyCards' avec des états initiaux pour gérer le numéro de carte, les cartes de fidélité et les erreurs
const LoyaltyCards = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  //L'identifiant de l'utilisateur est récupéré depuis le stockage local et assigné à une variable.
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
    try {
      const response = await axios.get("http://localhost:8000/getUserCards", {
        params: { user_id: currentUserId },
        withCredentials: true,
      });
      setCards(response.data.cards || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "L'erreur lors de la récupération des cartes"
      );
      setCards([]);
    }
  };
  //Envoi d'une requête POST avec le numero de la carte et l'id d'utilisateurs pour ajouter une carte à la base de données
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardNumber.trim()) {
      setError("Le numéro de la carte est requis");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/addCard",
        { card_number: cardNumber, user_id: currentUserId },
        { withCredentials: true }
      );
      // Si la réponse du serveur est positive, l'utilisateur recevra une notification,
      //  les cartes seront chargées, et l'état du numéro de carte sera mis à jour dans le state
      if (response.data.success) {
        alert("La carte a été ajouté");
        fetchCards();
        setCardNumber("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "L'erreur lors de l'ajout de la carte"
      );
    }
  };

  if (!currentUserId) {
    return <p>Veuillez vous connecter pour gérer vos cartes de fidélité.</p>;
  }

  return (
    <div>
      <h2>Les Cartes de Fidélité</h2>
      {/* Dans le formulaire, un numéro de carte sera saisi. Après avoir cliqué sur le bouton, la fonction handleSubmit sera déclenchée.
       Si l'utilisateur est connecté, la carte sera enregistrée dans la base de données */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Le numero de la carte"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <button type="submit">Ajoute une carte</button>
      </form>
      {error && <p>{error}</p>}
      <h3>Tes cartes:</h3>
      {/* Les cartes de fidélité disponibles de l'utilisateur seront affichées sur la page, et un code QR sera généré pour chacune d'elles */}
      <ul>
        {cards.map((card) => (
          <li key={card.card_id}>
            {card.card_number}
            <ReactQR value={card.card_number} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoyaltyCards;