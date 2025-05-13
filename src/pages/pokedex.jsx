import { useEffect, useState } from "react";
import Card from "../components/card";
import { pokemonCardsArray } from "../components/pokemonCards";
import styles from "../styles/pages/pokedex.module.css";
export default function pokedex() {
  const sortOptionsArray = ["1", "2", "3", "4", "5", "6", "7"];
  const filterOptionsArray = ["1", "2", "3", "4", "5", "6", "7"];
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleClickOnScreen = () => {
      setIsSortOpen(false);
      setIsFilterOpen(false);
    };
    document.addEventListener("click", handleClickOnScreen);
    return () => document.removeEventListener("click", handleClickOnScreen);
  });

  return (
    <div className={styles["pokedex-page-container"]}>
      <div className={styles["custom-cards-container"]}>
        <input type="text" placeholder="Search..." />
        <section className={styles["filter-and-sort"]}>
          <div className={styles["filter-box"]}>
            <button
              className={styles["filter-button"]}
              onClick={(event) => {
                event.stopPropagation();
                setIsFilterOpen(!isFilterOpen);
              }}
            >
              <label>filter by</label>
            </button>
            {isFilterOpen === true && (
              <div className={styles["filter-options"]}>
                {filterOptionsArray.map((option) => (
                  <div className={styles["option-container"]}>
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles["sort-box"]}>
            <button
              className={styles["sort-button"]}
              onClick={(event) => {
                event.stopPropagation();
                setIsSortOpen(!isSortOpen);
              }}
            >
              <label>sort by</label>
            </button>
            {isSortOpen === true && (
              <div className={styles["sort-options"]}>
                {sortOptionsArray.map((option) => (
                  <div className={styles["option-container"]}>
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
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
