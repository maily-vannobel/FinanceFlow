import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Création du point où l'application sera affichée
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendu de l'application dans l'élément DOM avec le gestionnaire de routes
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
