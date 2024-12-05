import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

//Création d'un composant Register, suivi de l'application du hook 'useFormik' fourni par la bibliothèque Formik,
// et définition des clés pour les valeurs initiales du formulaire.

const Register = () => {
    const formik = useFormik({
        initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        },

        //Définition des règles de validation pour le formulaire d'inscription
        validationSchema: Yup.object({
        firstname: Yup.string()
            .min(3, "Le prenom doit contenir au moins trois caractères")
            .required("Ce champ est requis"),

        lastname: Yup.string()
            .min(3, "Le nom doit contenir au moins trois caractères")
            .required("Ce champ est requis"),

        email: Yup.string()
            .email("L'email n'est pas valide")
            .required("Ce champ est requis"),

        password: Yup.string()
            .min(8, "Le mot de passe doit contenir au moins huit caractères")
            .matches(
            /[A-Z]/,
            "Le mot de passe doit contenir au moins une lettre majuscule"
            )
            .matches(
            /[a-z]/,
            "Le mot de passe doit contenir au moins une lettre minuscule"
            )
            .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
            .matches(
            /[@$!%*?&]/,
            "Le mot de passe doit contenir au moin un caractère spécial"
            )
            .required("Ce champ est requis"),
        }),
        //Envoi des données du formulaire au serveur via une requête POST, numero du port du backend: 8000, cookies dans la requête sont accepter
        onSubmit: async (values) => {
            try{
                const response = await axios.post(
                    "http://localhost:8000/register",
                    values, {withCredientals: true}
                );
                alert("L'inscription a réussi");
            } catch (error) {
                alert("L'inscription a échoué")
            }
        },
    });

    return (
        
    )



}