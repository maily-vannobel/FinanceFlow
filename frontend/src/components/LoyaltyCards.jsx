import { useEffect, useState } from "react";
import React {useState, useEffect} from "react";
import axios from "axios";

//Création d'un component 'LoyaltyCards' avec des états initiaux pour gérer le numéro de carte, les cartes de fidélité et les erreurs
const LoyaltyCards = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCards();
    }, []);
    //Envoi d'une requête GET a l'endpoint pour récuperer les cartes de fidélité d'un utilisateur, avec gestion des erreurs
    const fetchCards = async () => {
        try {
            const response = await axios.get("http://localhost/8000/get_loyalty_cards", {
                params: {user_id: currentUserId},
                withCredentials: true,
        });
        setCards(response.data.cards);
        }catch(err) {
            setError(err.response?.data?.message || "L'erreur lors de la récupération des cartes")
        }
    };

}