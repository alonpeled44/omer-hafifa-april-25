import { createContext, useContext, useEffect, useState } from "react";

const DigimonsDbContext = createContext();

export function DigimonsDbProvider({ children }) {
  const [digimons, setDigimons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://digi-api.com/api/v1/digimon?pageSize=100"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch digimons");
        }

        const data = await response.json();
        setDigimons(data.content);
        setTypes(data.content.fields);
        console.log(digimons);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DigimonsDbContext.Provider value={{ digimons, types, loading, error }}>
      {children}
    </DigimonsDbContext.Provider>
  );
}

export function useDigimonsDb() {
  const context = useContext(DigimonsDbContext);
  if (!context) {
    throw new Error("useDigimonsDb must be used within a DigimonsDbProvider");
  }
  return context;
}
