import {
  useEffect,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import { useRouter } from "next/router";
import { User } from "./types";

const UserContext = createContext<
  [User | null, React.Dispatch<React.SetStateAction<User | null>>] | null
>(null);

export default function UserProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // Load from localStorage on mount
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("currentUser");
  //   if (storedUser) {
  //     setCurrentUser(JSON.parse(storedUser));
  //   }
  // }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
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
