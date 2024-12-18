import { useState, useEffect } from "react";
import axios from "axios";
import ReactQR from "react-qr-code";
import Barcode from "react-barcode";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useAuth } from "../contexts/AuthContext";
//Création d'un component 'LoyaltyCards' avec des états initiaux pour gérer le numéro de carte, les cartes de fidélité, les erreurs et d'autres
const LoyaltyCards = () => {
  const { user } = useAuth();
  const [cardNumber, setCardNumber] = useState("");
  const [cardEstablishment, setCardEstablishment] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  //today contient la date actuelle, et il va servir à gérer le calendrier
  const today = new Date().toISOString().split("T")[0];
  // useEffect déclenche dès le début le chargement des cartes existantes, et cela ne se fait qu'une seule fois, comme l'indique le tableau vide
  useEffect(() => {
    if (user && user.user_id) {
      fetchCards();
    }
  }, [user]);
  //Envoi d'une requête GET a l'endpoint pour récuperer les cartes de fidélité d'un utilisateur, avec gestion des erreurs
  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/getUserCards", {
        params: { user_id: user.user_id },
        withCredentials: true,
      });
      setCards(response.data.cards || []);
      setError(null);
      setSuccess(null);
    } catch (err) {
      setError(
        err.response?.data?.error ||
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
    if (cardNumber.length < 8) {
      setError("Le numero de la carte doit contenir au moins 8 chiffres");
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
          user_id: user?.user_id,
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

  //Cette function envoie une requête DELETE pour supprimer une carte de fidélité choisi par l'utilisateur
  const handleDelete = async (cardNumber) => {
    //L'onglet de la confirmation s'affiche avec le message pour utilisateur
    const confirmDelete = window.confirm(
      "Êtes-vous sûre de vouloir supprimer cette carte ?"
    );
    if (!confirmDelete) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.delete("http://localhost:8000/deleteCard", {
        data: { card_number: cardNumber, user_id: user.user_id },
        withCredentials: true,
      });
      if (response.data.success) {
        setSuccess("La carte a été supprimée");
        setTimeout(() => setSuccess(null), 5000);
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
  //Cette function charge une image, l'assigne un nom 'barcode_image' et envoi une requête post au backend
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("Veuillez sélectionner un fichier image");
      return;
    }
    setImageFile(file);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("barcode_image", file);
      const response = await axios.post(
        "http://localhost:8000/uploadImage",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      //Si la reponse est positive le numero de la carte s'asssigne dans le setCardNumber
      if (response.data.success) {
        setCardNumber(response.data.barecode || response.data.qr_code);
        setSuccess(
          "Le code a été lu avec succès, veuillez complèter les détails"
        );
        setTimeout(() => setSuccess(null), 6000);
        setError(null);
      } else {
        setError(response.data.error || "Aucun code détecté");
      }
    } catch (err) {
      setError("Erreur lors du téléchargement de l'image");
    } finally {
      setLoading(false);
    }
  };
  //Cette méthode sera appeller pour récuperer le numèro de la carte et le transmettre dans le formulaire
  const handleBarcodeScan = async (result) => {
    if (!result || !result[0]) {
      setError("Scan error: No result found");
      return;
    }
    const scannedCardNumber = result[0].rawValue;
    setCardNumber(scannedCardNumber);
    setSuccess(
      "Le code a été scanné avec succès, veuillez compléter les détails"
    );
    setTimeout(() => setSuccess(null), 5000);
    setError(null);
  };

  const handleError = (error) => {
    setError(`Erreur lors du scan : ${error}`); //Template literals au lieu de: "Erreur lors du scan:" + erreur
    setTimeout(() => setError(null), 3000);
  };
  return (
    <div>
      <h2>Les Cartes de Fidélité</h2>
      {/* Les styles temporairement mis dans le component */}
      <h3>Scanner le code-barres</h3>
      {scanning && (
        <div
          style={{
            width: "60%",
            height: "auto",
            margin: "0 auto",
            padding: "40px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {" "}
          {/*La bibliothèque 'Scanner' permet de gérer le scanner de cartes via le caméra de l'appareil*/}
          <Scanner
            onScan={(result) => handleBarcodeScan(result)}
            onError={handleError}
          />
        </div>
      )}
      <button onClick={() => setScanning((prev) => !prev)}>
        {scanning ? "Arrêter le scan" : "Commencer le scan"}
      </button>

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
      {/* L'input qui gére le téléchargèment de l'image, il utilise le function handleImageUpload */}
      <h3>Charger une image</h3>
      <input type="file" accept="image */" onChange={handleImageUpload} />
      <h3>Scanner le code-barres</h3>

      {success && <p>{success}</p>}
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
              <button
                type="button"
                onClick={() => handleDelete(card.card_number)}
                disabled={loading}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoyaltyCards;
