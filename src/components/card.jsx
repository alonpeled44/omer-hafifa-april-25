import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import styles from "../styles/components/card.module.css";

export default function Card({ card, onClick, digimonProperties }) {
  const { screenWidth } = useScreenWidth();

  return (
    <div onClick={onClick} className={styles.card}>
      {screenWidth > 1200 ? (
        <section className={styles["digimon-info"]}>
          <p>#{card.id}</p>
          <p>{card.name}</p>
        </section>
      ) : (
        <p>{card.name}</p>
      )}
      <img src={card.image} />
      {screenWidth > 1200 && (
        <section className={styles["digimon-details"]}>
          <p>Type: {digimonProperties.type || "unknown"}</p>
          <p>Level: {digimonProperties.level || "negative"}</p>
          <p>Field: {digimonProperties.field || "none"}</p>
        </section>
      )}
    </div>
  );
}
