import Card from "../components/card";
import { pokemonCardsArray } from "../components/pokemonCards";
import styles from "../styles/pages/pokedex.module.css";
export default function pokedex() {
  return (
    <div className={styles["pokedex-page-container"]}>
      <div className={styles["custom-cards-container"]}>
        <input type="text" placeholder="Search..." />
        <section className={styles["filter-and-sort"]}>
          <select className={styles["filter-by"]}>
            <option value="" disabled selected>
              filter by
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <select className={styles["sort-by"]}>
            <option value="" disabled selected>
              sort by
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </section>
      </div>
      <div className={styles["cards-container"]}>
        {pokemonCardsArray.map((card) => (
          <Card
            id={card.id}
            name={card.name}
            type={card.type}
            height={card.height}
            weight={card.weight}
            frontViewImageUrl={card.frontViewImageUrl}
            backViewImageUrl={card.backViewImageUrl}
            frontShinyViewImageUrl={card.frontShinyViewImageUrl}
            backShinyViewImageUrl={card.backShinyViewImageUrl}
          />
        ))}
      </div>
    </div>
  );
}
