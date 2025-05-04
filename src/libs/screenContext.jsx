
import { createContext, useContext, useEffect, useState } from "react";

const ScreenWidthContext = createContext(0);

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
        console.log('useScreenWidth must be used inside ScreenWidthProvider');
        return 0;
    }
    
    return context;
}