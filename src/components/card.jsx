import { useScreenWidth } from "../libs/screenContext";
import styles from "../styles/components/card.module.css";
export default function Card({
  id,
  name,
  type,
  height,
  weight,
  frontViewImageUrl,
  backViewImageUrl,
  frontShinyViewImageUrl,
  backShinyViewImageUrl,
  onClick,
}) {
  const { screenWidth } = useScreenWidth();
  
  return (
    <div onClick={onClick} className={styles["card-general"]}>
      {screenWidth > 1200 ? (
        <section className={styles["name-id-container"]}>
          <p>#{id}</p>
          <p>{name}</p>
        </section>
      ) : (
        <p>{name}</p>
      )}
      <div>
        <img src={frontViewImageUrl} />
      </div>
      {screenWidth > 1200 && (
        <section>
          <p>Type: {type}</p>
          <p>height: {height}</p>
          <p>weight: {weight}</p>
        </section>
      )}
    </div>
  );
}
