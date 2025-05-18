import { useEffect, useState } from "react";
import Card from "../components/card";
import { pokemonCardsArray } from "../components/pokemonCards";
import styles from "../styles/pages/pokedex.module.css";
import Modal from "../components/dialogModal";
export default function pokedex() {
  const sortOptionsArray = ["1", "2", "3", "4", "5", "6", "7"];
  const filterOptionsArray = ["1", "2", "3", "4", "5", "6", "7"];
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showShinyOnly, setShowShinyOnly] = useState(false);

  useEffect(() => {
    const handleClickOnScreen = () => {
      setIsSortOpen(false);
      setIsFilterOpen(false);
    };
    document.addEventListener("click", handleClickOnScreen);
    return () => document.removeEventListener("click", handleClickOnScreen);
  });

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("entering closeModal");
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleShinyFilterChange = (event) => {
    setShowShinyOnly(event.target.checked);
  }

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
                  <p className={styles["option-container"]}>{option}</p>
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
                  <p className={styles["option-container"]}>{option}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <div className={styles["cards-container"]}>
        {pokemonCardsArray.map((card) => (
          <Card
            onClick={() => openModal(card)}
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
      {selectedCard && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <section>
            <p>#{selectedCard.id}</p>
            <p>{selectedCard.name}</p>
            <label>
              <input
              type="checkbox"
              checked={showShinyOnly}
              onChange={handleShinyFilterChange}
              />
              Shiny
            </label>
          </section>

          <section>
            <img></img>
            <img></img>
          </section>

          <section>
            <p></p>
            <p></p>
            <p></p>
          </section>
        </Modal>
      )}
    </div>
  );
}
