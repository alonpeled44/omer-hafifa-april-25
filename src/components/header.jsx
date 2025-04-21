import React, { useEffect, useState } from "react";
import styles from "../styles/components/header.module.css";
import pokemonIcon from "../images/pokemon-photo.png";

export default function Header() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(new Date());
    };

    updateDate();

    const intervalId = setInterval(updateDate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <header>
        <div className={styles["logo-header"]}>
          <img src={pokemonIcon.src} />
          <p className={styles["header-text"]}>pokemon</p>
        </div>

        <div className={styles["date"]}>
          {currentDate.toLocaleDateString("en-GB")}
        </div>
      </header>
    </>
  );
}
