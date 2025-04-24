import { useEffect, useState } from "react";
import pokemonIcon from "../images/pokemon-photo.png";
import styles from "../styles/components/header.module.css";

function Header() {
  const currentDate = new Date();
  const [width, setWidth]= useState(0);
  
  useEffect(()=> {
    const handleResize = () => {
      setWidth(innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles["logo-header"]}>
        <img src={pokemonIcon.src} />
        <p className={styles["header-text"]}>pokemon</p>
      </div>

      <div className={styles.date}>
        {width>1200 && <p>{currentDate.toLocaleDateString("en-GB")}</p>}
      </div>
    </header>
  );
}

export default Header;