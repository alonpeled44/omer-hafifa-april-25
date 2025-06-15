import { useScreenWidth } from "../libs/screenContext";
import styles from "../styles/components/card.module.css";

export default function Card({ card, onClick }) {
  const { screenWidth } = useScreenWidth();

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
      <img src={card.frontViewImageUrl} className={styles["image"]} />
      {screenWidth > 1200 && (
        <section className={styles["pokemon-details"]}>
          <p>Type: {card.type}</p>
          <p>Height: {card.height}</p>
          <p>Weight: {card.weight}</p>
        </section>
      )}
    </div>
  );
}
