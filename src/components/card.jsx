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
}) {
  return (
    <div className={styles["card-general"]}>
      <p>{id}</p>
      <p>{name}</p>
      <p>{type}</p>
      <p>{height}</p>
      <p>{weight}</p>
      <img src={frontViewImageUrl} />
      <p>{backViewImageUrl}</p>
      <p>{frontShinyViewImageUrl}</p>
      <p>{backShinyViewImageUrl}</p>
    </div>
  );
}
