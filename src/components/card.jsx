import { useScreenWidth } from "../libs/screenContext";
import styles from "../styles/components/card.module.css";

export default function Card({ card, onClick }) {
  const { screenWidth } = useScreenWidth();

  return (
    <div onClick={onClick} className={styles.card}>
      {screenWidth > 1200 ? (
        <section className={styles["name-id-container"]}>
          <p>#{card.id}</p>
          <p>{card.name}</p>
        </section>
      ) : (
        <p>{card.name}</p>
      )}
      <img src={card.frontViewImageUrl} className={styles["image-container"]} />
      {screenWidth > 1200 && (
        <section className={styles["pokemon-data-container"]}>
          <p>Type: {card.type}</p>
          <p>Height: {card.height}</p>
          <p>Weight: {card.weight}</p>
        </section>
      )}
    </div>
  );
}
