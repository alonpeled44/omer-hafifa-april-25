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
      <div className={styles["name-id-container"]}>
        <p>#{id}</p>
        <p>{name}</p>
      </div>
      <img src={frontViewImageUrl} />
      <p>{backViewImageUrl}</p>
      <p>{frontShinyViewImageUrl}</p>
      <p>{backShinyViewImageUrl}</p>
      <div>
        <p>Type: {type}</p>
        <p>height: {height}</p>
        <p>weight: {weight}</p>
      </div>
    </div>
  );
}
