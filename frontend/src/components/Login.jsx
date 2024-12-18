import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

//Création d'un composant Login, suivi de l'application du hook 'useFormik' fourni par la bibliothèque Formik,
// et définition des clés pour les valeurs initiales du formulaire.
const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //Utilisation de la fonction login du AuthContext
  const { login } = useAuth();
  //Initialisation des valeurs email et password
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
        setError(null);
        const response = await axios.post(
          "http://localhost:8000/login",
          values,
          { withCredentials: true }
        );
        if (response.data.success) {
          //Après la connexion, l'id de l'utilisateur sera attacher au login
          login({ user_id: response.data.user_id });
          alert("Connexion a réussie !");
          navigate("/dashboard");
        }
      } catch (error) {
        setError(error.response?.data?.error || "Une erreur est survenue");
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
          onChange={(e) => {
            formik.handleChange(e);
            setError(null);
          }}
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
          onChange={(e) => {
            formik.handleChange(e);
            setError(null);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </label>
      {error && <div>{error}</div>}
      <button type="submit" disabled={formik.isSubmitting}>
        Connexion
      </button>
    </form>
  );
};

export default Login;
