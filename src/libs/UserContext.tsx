import {useEffect, useState, useContext, createContext, PropsWithChildren } from "react";
import { User } from "./types";

const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>] | null>(null);

export default function UserProvider({children}: PropsWithChildren) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);


    return (<UserContext.Provider value={[currentUser, setCurrentUser]}>{children}</UserContext.Provider>)
}

export function useUser() {
    const context = useContext(UserContext);
    if(!context) return null;

    return context;
}