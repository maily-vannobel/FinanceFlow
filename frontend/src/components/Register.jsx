import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Création d'un composant Register, suivi de l'application du hook 'useFormik' fourni par la bibliothèque Formik,
// et définition des clés pour les valeurs initiales du formulaire.
const Register = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      zipcode: "",
      city: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: "",
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

      address: Yup.string()
        .min(4, "L'adresse doit contenir au moins 4 caractères")
        .required("Ce champ est requis"),

      zipcode: Yup.string()
        .min(4, "Le code postale doit contenir au moins quatre caractères")
        .required("Ce champ est requis"),

      city: Yup.string()
        .min(2, "La ville doit contenir au moins deux caractères")
        .required("Ce champ est requis"),

      phone: Yup.string()
        .min(6, "Le numèro de téléphone doit contenir au moins six caractères")
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
          "Le mot de passe doit contenir au moins un caractère spécial"
        )
        .required("Ce champ est requis"),

      repeatPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Les mots de passe ne correspondent pas"
        )
        .required("Veuillez confirmer votre mot de passe"),
    }),
    //Envoi des données du formulaire au serveur via une requête POST, numero du port du backend: 8000,
    //  les cookies sont inclus dans la requête grace à options 'withCredentials'
    onSubmit: async (values) => {
      try {
        setError(null);
        const response = await axios.post(
          "http://localhost:8000/register",
          values,
          { withCredentials: true }
        );
        console.log("Server response:", response.data);
        if (response.data.success) {
          alert("L'inscription a réussi");
          navigate("/login");
        }
      } catch (error) {
        setError(error.response?.data?.error || "L'inscription a échoué");
      }
    },
  });

  return (
    //Ce fragment de code crée des champs du formulaire permettant à l'utilisateur de saisir ses données d'inscription
    //Formik suit l'utilisateur et gère les éventuelles erreurs
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstname">
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
      <label htmlFor="lastname">
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
      <label htmlFor="address">
        Adresse:
        <input
          type="text"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address ? (
          <div>{formik.errors.address}</div>
        ) : null}
      </label>
      <label htmlFor="zipcode">
        Code postale:
        <input
          type="text"
          name="zipcode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.zipcode}
        />
        {formik.touched.zipcode && formik.errors.zipcode ? (
          <div>{formik.errors.zipcode}</div>
        ) : null}
      </label>
      <label htmlFor="city">
        Ville:
        <input
          type="text"
          name="city"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city ? (
          <div>{formik.errors.city}</div>
        ) : null}
      </label>

      <label htmlFor="phone">
        Le numèro de télephone:
        <input
          type="tel"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div>{formik.errors.phone}</div>
        ) : null}
      </label>
      <label htmlFor="email">
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
      <label htmlFor="passsword">
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
      <label htmlFor="passsword">
        Confirmez le mot de passe:
        <input
          type="password"
          name="repeatPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
        />
        {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
          <div>{formik.errors.repeatPassword}</div>
        ) : null}
      </label>
      {error && <div>{error}</div>}
      <button type="submit" disabled={formik.isSubmitting}>
        Inscrivez-vous
      </button>
    </form>
  );
};

export default Register;
