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
      try {
        const response = await axios.post(
          "http://localhost:8000/register",
          values,
          { withCredientals: true }
        );
        alert("L'inscription a réussi");
      } catch (error) {
        alert("L'inscription a échoué");
      }
    },
  });

  return (
    //Ce fragment de code crée des champs de formulaire permettant à l'utilisateur de saisir ses données d'inscription
    //Formik suit l'utilisateur et gère les éventuelles erreurs
    <form onSubmit={formik.handleSubmit}>
      <label>
        Prenom:
        <input
          type="text"
          name="firstname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstname}
        />
        {formik.touched.firstname && formik.errors.firstname ? (
          <div>{formik.errors.firstname}</div>
        ) : null}
      </label>
      <label>
        Nom:
        <input
          type="text"
          name="lastname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastname}
        />
        {formik.touched.lastname && formik.errors.lastname ? (
          <div>{formik.errors.lastname}</div>
        ) : null}
      </label>
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
      <button type="submit">Inscrivez-vous</button>
    </form>
  );
};

export default Register;
