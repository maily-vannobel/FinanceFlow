import { createContext, useState, useContext } from "react";
//Création du contexe AuthContext
const AuthContext = createContext();
// AuthProvider fournit le données du contexte AuthContext, 'children' va contenir tout les éléments à l'interieur du <AuthProvider>
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //Fonction de connexion, userData stockes les infomations de l'utilisateur après la connexion
  const login = (userData) => {
    setUser(userData);
  };
  //Réanitialisation du l'état-> les données d'utilisateur seront supprimer du contexte
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
//Utilisation du useAuth pour facilement accéder au contexte AuthContext dans n'importe quel composant
export const useAuth = () => {
  return useContext(AuthContext);
};
