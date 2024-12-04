Configuration React : Vite

1. PS C:\wamp64\www\FinanceFlow> node -v
    si la réponse contient une version par ex. : v22.11.0, c’est ok, sinon il faut installer node

2. C:\wamp64\www\FinanceFlow> npm create vite@latest
    Need to install the following packages:
    create-vite@6.0.1
    Ok to proceed? (y) y
    confirmer avec y

3. √ Project name: ... (le nom du projet ou la partie du projet comme frontend)
      ensuite:
    √ Select a framework: » React
    √ Select a variant: » JavaScript

4. PS C:\wamp64\www\FinanceFlow> cd .\le nom du projet ou frontend\

5. npm i (installation)


6. Après l’installation npm run dev

7. Le contenu du fichier main.jsx :

import ReactDOM from “react-dom/client”;

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

8. Le contenu du départ du fichier App.jsx:

import des UseStates, Hooks etc.


function App() {
     return 
<>

</>
}

export default App;


Les bibliothèques installés:


npm install formik yup axios
npm install react-router-dom
9. Le port pour le backend 8000 —--> C:\wamp64\www\FinanceFlow\backend> php -S localhost:8000

