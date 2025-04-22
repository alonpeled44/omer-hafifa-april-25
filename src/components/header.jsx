import pokemonIcon from "../images/pokemon-photo.png";
import styles from "../styles/components/header.module.css";

export default function Header() {
  const currentDate = new Date();

  return (
    <header>
      <div className={styles["logo-header"]}>
        <img src={pokemonIcon.src} />
        <p className={styles["header-text"]}>pokemon</p>
      </div>

      <p className={styles.date}>{currentDate.toLocaleDateString("en-GB")}</p>
    </header>
  );
}
