import { useEffect, useState } from "react";
import Card from "../components/card";
import { pokemonCardsArray } from "../components/pokemonCards";
import styles from "../styles/pages/pokedex.module.css";
export default function pokedex() {
  const sortOptionsArray = ["1", "2", "3", "4", "5", "6", "7"];
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickSort = () => {
      setIsOpen(false);
    };
    document.addEventListener("click", handleClickSort);
    return () => document.removeEventListener("click", handleClickSort);
  });

  return (
    <div className={styles["pokedex-page-container"]}>
      <div className={styles["custom-cards-container"]}>
        <input type="text" placeholder="Search..." />
        <section className={styles["filter-and-sort"]}>
          <div className="filter-box">
            <button className="filter-button">filter by</button>
            <div className="filter-options">
              <div className="option">1</div>
              <div className="option">2</div>
              <div className="option">3</div>
              <div className="option">4</div>
              <div className="option">5</div>
              <div className="option">6</div>
              <div className="option">7</div>
            </div>
          </div>

          <div className={styles["sort-box"]}>
            <button
              className={styles["sort-button"]}
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              <label>sort by</label>
            </button>
            {isOpen === true && (
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
