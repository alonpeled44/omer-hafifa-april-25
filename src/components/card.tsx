import { useScreenWidth } from "../libs/ScreenContext";
import { Digimon } from "@/libs/types";
import styles from "../styles/components/card.module.css";

interface DigimonDetails {
  type: string;
  level: string;
}

interface CardProps {
  card: Digimon;
  digimon: DigimonDetails;
  onClick: () => void;
}

export default function Card({ card, onClick, digimon }: CardProps) {
  const screenWidth = useScreenWidth();

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
          <p>Type: {digimon.type || "unknown"}</p>
          <p>Level: {digimon.level || "negative"}</p>
        </section>
      )}
    </div>
  );
}
