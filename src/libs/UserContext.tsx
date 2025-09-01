import {
  useEffect,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { useRouter } from "next/router";
import { User } from "./types";
import { getUserById } from "./useUser";

const UserContext = createContext<
  [User | null, React.Dispatch<React.SetStateAction<User | null>>] | null
>(null);

export default function UserProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("currentUser");
    if (storedId) {
      const user = getUserById(Number(storedId));
      setCurrentUser({ id: Number(storedId) } as User);
    }
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      const stored = localStorage.getItem("currentUser");
      if (!stored) {
        router.push("/login");
      }
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", String(currentUser.id));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) return null;

  return context;
}
