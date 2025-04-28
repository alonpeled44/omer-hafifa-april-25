import { useEffect, useState } from "react";
import pokemonIcon from "../images/pokemon-photo.png";
import styles from "../styles/components/header.module.css";

function Header() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    
    const handleResize = () => {
      setScreenWidth(innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles["logo-header"]}>
        <img src={pokemonIcon.src} />
        <p className={styles["header-text"]}>pokemon</p>
      </div>

      {screenWidth > 1200 && (
        <p className={styles.date}>{new Date().toLocaleDateString("en-GB")}</p>
      )}
    </header>
  );
}

export default Header;
