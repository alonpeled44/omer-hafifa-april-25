import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ScreenWidthContext = createContext<number>(0);

interface ScreenWidthProviderProps {
  children: ReactNode;
}

export function ScreenWidthProvider({ children }: ScreenWidthProviderProps) {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize: () => void = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenWidthContext.Provider value={screenWidth}>
      {children}
    </ScreenWidthContext.Provider>
  );
}

export function useScreenWidth(): number {
  const context = useContext(ScreenWidthContext);
  if (!context) {
    console.log("no screen width context found");
    return 0;
  }

  return context;
}
