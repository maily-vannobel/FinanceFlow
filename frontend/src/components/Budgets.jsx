import React, { useState, useEffect } from "react";
import axios from "axios";

const Budgets = () => {
  const [budgets, setBudgets] = useState("");

  const fetchBudgets = async () => {
    try {
      const reponse = await fetch("http://localhost:8000/read_budgets");

      const jsonData = await reponse.json();
      console.log(jsonData);

      setBudgets(jsonData);
    } catch (error) {
      console.error("Erreur lors de la récupération des budgets :", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div>
      <h1>Les budgets</h1>

      <ul>
        {budgets.length > 0 ? (
          budgets.map((budget) => <li key={budget.budget_id}>{budget.amount_limit}</li>)
        ) : (
          <p>Aucun budgets trouvé.</p>
        )}
      </ul>
    </div>
  );
};

export default Budgets;
