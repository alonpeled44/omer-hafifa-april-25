import React from "react";
import pokemonIcon from "../photos/pokemon-photo.png";
import styles from "../styles/components/header.module.css";
export default function Header() {
  return (
    <>
      <header>
        <div className={styles["logo-header"]}>
          <img src={pokemonIcon.src} />
          <p className={styles["header-text"]}>pokemon</p>
        </div>

        <div id="date"></div>
      </header>
    </>
  );
}
