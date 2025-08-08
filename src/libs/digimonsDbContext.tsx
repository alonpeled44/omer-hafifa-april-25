import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DigimonsDbContext = createContext<DigimonsDbContextType | undefined>(undefined); //specify the expected returned values from context.

interface DigimonsDbProviderProps {
  children: ReactNode;
}
interface Digimon {
  id: number;
  name: string;
  image: string;
}

interface DigimonApiRespone {
  content: Digimon[];
}

interface TypeField {
  name: string;
}

interface DigimonTypesResponse {
  content: {
    fields: TypeField[];
  };
}

interface DigimonsDbContextType {
  digimons: Digimon[];
  types: string[];
  loading: boolean;
  error: string | null;
}

export function DigimonsDbProvider({ children }: DigimonsDbProviderProps) {
  const [digimons, setDigimons] = useState<Digimon[]>([]);

  const [types, setTypes] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://digi-api.com/api/v1/digimon?pageSize=100"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch digimons");
        }

        const data: DigimonApiRespone = await response.json();
        setDigimons(data.content);
        setLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    const fetchTypes = async (): Promise<void> => {
      let allTypes: string[] = [];
      for (let i = 0; i < 5; i++) {
        try {
          const response = await fetch(
            `https://digi-api.com/api/v1/type?page=${i}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch digimons types");
          }

          const data: DigimonTypesResponse = await response.json();
          const pageTypes = data.content.fields.map((type: TypeField) => type.name);
          allTypes = [...allTypes, ...pageTypes];
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "An unknown error occurred"); //let know if error with wierd rejection accord("throw 42" for example).
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

export function useDigimonsDb(): DigimonsDbContextType {
  const context = useContext(DigimonsDbContext);
  if (!context) {
    throw new Error("useDigimonsDb must be used within a DigimonsDbProvider");
  }
  return context;
}
