import React from "react";

const Logout = () => {
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST", // Remplace par GET si nécessaire
        credentials: "include", // Inclut les cookies si besoin
      });
      if (response.ok) {
        console.log("Déconnexion réussie !");
        // Redirige ou effectue d'autres actions après la déconnexion
      } else {
        console.error("Échec de la déconnexion :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <button onClick={logout} style={{ cursor: "pointer" }}>
      Se déconnecter
    </button>
  );
};

export default Logout;
