
import Login from "../pages/login";
import { Children, createContext, useContext, useEffect, useState } from "react";

export const ScreenWidthContext = createContext(null);

export function UseScreenWidthContext() {
    const [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <ScreenWidthContext.Provider value={screenWidth}>
            <Children />
        </ScreenWidthContext.Provider>
    )
}