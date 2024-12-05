import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

//Création d'un composant Login, suivi de l'application du hook 'useFormik' fourni par la bibliothèque Formik,
// et définition des clés pour les valeurs initiales du formulaire.
const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    //Définition du schéma de validation pour l'email et le mot de passe avec des messages d'erreur.
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email est invalide")
        .required("Ce champ est requis"),
      password: Yup.string().required("Ce champ est requis"),
    }),

    //Envoi des données du formulaire au serveur via une requête POST, affichage des messages selon le resultat.
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/login",
          values,
          { withCredentials: true }
        );
        alert(response.data.success || "Connexion réussie");
      } catch (error) {
        alert(
          (error.response && error.response.data.error) || "Connexion échouée"
        );
      }
    },
  });

  //Crée des champs du formulaire permettant à utilisateur de saisir ses données de connexion
  //Formik suit les résultats des inputs dynamiquement et informe l'utilisateur en cas d'erreurs.
  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </label>
      <label>
        Le mot de passe:
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </label>
      <button type="submit">Connexion</button>
    </form>
  );
};

export default Login;
