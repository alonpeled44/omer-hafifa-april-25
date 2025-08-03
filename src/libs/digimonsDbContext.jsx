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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchTypes = async () => {
      let allTypes = [];
      for (let i = 0; i < 5; i++) {
        try {
          const response = await fetch(
            `https://digi-api.com/api/v1/type?page=${i}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch digimons types");
          }

          const data = await response.json();
          const pageTypes = data.content.fields.map((type) => type.name);
          allTypes = [...allTypes, ...pageTypes];
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      }
      setTypes(allTypes.slice(0, 25));
      setLoading(false);
    };
    fetchData();
    fetchTypes();
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
