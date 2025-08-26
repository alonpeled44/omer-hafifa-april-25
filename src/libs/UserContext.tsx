import {useState, useContext, createContext, PropsWithChildren } from "react";
import { User } from "./types";

const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>] | null>(null);

export default function UserProvider({children}: PropsWithChildren) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    return (<UserContext.Provider value={[currentUser, setCurrentUser]}>{children}</UserContext.Provider>)
}

export function useUser() {
    const context = useContext(UserContext);
    if(!context) return null;

    return context;
}