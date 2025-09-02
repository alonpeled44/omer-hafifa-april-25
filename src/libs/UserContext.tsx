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

  // useEffect(() => {
  //   if (!currentUser && router.pathname === "/") {
  //     const storedId = localStorage.getItem("id");
  //     async function getUserRow() {
  //       const user = await getUserById(Number(storedId));
  //       setCurrentUser(user);
  //     }

  //     getUserRow();
  //   }
  // }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    async function getUserRow() {
      const user = await getUserById(Number(storedId));
      setCurrentUser(user);
    }

    if (storedId) {
      getUserRow();
    }
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      const stored = localStorage.getItem("id");
      async function getUserRow() {
        const user = await getUserById(Number(stored));
        setCurrentUser(user);
      }
      if (!stored) {
        router.push("/login");
      } else {
        getUserRow();
      }
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("id", String(currentUser.id));
      localStorage.setItem("theme", currentUser.theme);
      localStorage.setItem("fontSize", currentUser.fontSize);
    } else {
      localStorage.removeItem("id");
      localStorage.removeItem("theme");
      localStorage.removeItem("fontSize");
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
