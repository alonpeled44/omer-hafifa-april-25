
import { createContext, useContext, useEffect, useState } from "react";

export const ScreenWidthContext = createContext(0);

export function ScreenWidthProvider({children}) {
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
        <ScreenWidthContext.Provider value={{screenWidth}}>
            {children}
        </ScreenWidthContext.Provider>
    )
}

export function useScreenWidth() {
    const context = useContext(ScreenWidthContext);
    if(!context){
        throw new Error('useScreenWidth must be used within ScreenWidthProvider');
    }
    return context;
}