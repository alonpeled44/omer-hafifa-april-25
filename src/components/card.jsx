import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import styles from "../styles/components/card.module.css";

export default function Card({ card, onClick }) {
  const { screenWidth } = useScreenWidth();
  const [digimonProperties, setDigimonProperties] = useState({});

  useEffect(() => {
    const fetchType = async () => {
      try {
        const response = await fetch(card.href);
        if (!response.ok) {
          throw new Error("Failed to fetch type of digimon");
        }

        const data = await response.json();
        setDigimonProperties(data);
      } catch (err) {}
    };

    fetchType();
  }, []);

  return (
    <div onClick={onClick} className={styles.card}>
      {screenWidth > 1200 ? (
        <section className={styles["pokemon-info"]}>
          <p>#{card.id}</p>
          <p>{card.name}</p>
        </section>
      ) : (
        <p>{card.name}</p>
      )}
      <img src={card.image} />
      {screenWidth > 1200 && (
        <section className={styles["pokemon-details"]}>
          <p>Type: {digimonProperties.types?.[0]?.type || "unknown"}</p>
          <p>Level: {digimonProperties.levels?.[0]?.level || "negative"}</p>
          <p>Field: {digimonProperties.fields?.[0]?.field || "none"}</p>
        </section>
      )}
    </div>
  );
}
