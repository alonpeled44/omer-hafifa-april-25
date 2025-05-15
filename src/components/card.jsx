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
  onClick
}) {
  return (
    <div onClick={onClick} className={styles["card-general"]}>
      <section className={styles["name-id-container"]}>
        <p>#{id}</p>
        <p>{name}</p>
      </section>
      <div>
        <img src={frontViewImageUrl} />
      </div>
      <p>{backViewImageUrl}</p>
      <p>{frontShinyViewImageUrl}</p>
      <p>{backShinyViewImageUrl}</p>
      <section>
        <p>Type: {type}</p>
        <p>height: {height}</p>
        <p>weight: {weight}</p>
      </section>
    </div>
  );
}
