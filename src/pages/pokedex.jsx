import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import { pokemons } from "../components/pokemons";
import Card from "../components/card";
import Modal from "../components/Modal";
import styles from "../styles/pages/pokedex.module.css";

export default function pokedex() {
  const sortOptions = ["1", "2", "3", "4", "5", "6", "7"];
  const filterOptions = ["1", "2", "3", "4", "5", "6", "7"];
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showShiny, setShowShiny] = useState(false);

  const { screenWidth } = useScreenWidth();

  useEffect(() => {
    const handleClickOnScreen = () => {
      setIsSortOpen(false);
      setIsFilterOpen(false);
    };

    document.addEventListener("click", handleClickOnScreen);
    return () => document.removeEventListener("click", handleClickOnScreen);
  });

  const handleShinyChange = (event) => {
    setShowShiny(event.target.checked);
  };

  return (
    <>
      <div className={styles["pokedex-content-container"]}>
        <div className={styles["control-bar-container"]}>
          <input type="text" placeholder="Search..." />
          <section className={styles["filter-and-sort"]}>
            <div className={styles["filter-container"]}>
              <button
                className={styles["filter-button"]}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsFilterOpen((prev) => !prev);
                }}
              >
                filter by
              </button>

              {isFilterOpen && (
                <div className={styles["filter-options"]}>
                  {filterOptions.map((option) => (
                    <p className={styles["option"]}>{option}</p>
                  ))}
                </div>
              )}
            </div>

            <div className={styles["sort-container"]}>
              <button
                className={styles["sort-button"]}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsSortOpen((prev) => !prev);
                }}
              >
                sort by
              </button>
              {isSortOpen === true && (
                <div className={styles["sort-options"]}>
                  {sortOptions.map((option) => (
                    <p className={styles["option"]}>{option}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className={styles["cards-container"]}>
          {pokemons.map((card) => (
            <Card
              card={card}
              onCardClick={() => {
                setSelectedCard(card);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCard(null);
          }}
        >
          <>
            <section className={styles["id-name-control-pop-up-container"]}>
              <p>{selectedCard.name}</p>

              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={showShiny}
                    onChange={handleShinyChange}
                  />
                  Shiny
                </label>

                <p>#{selectedCard.id}</p>
              </div>
            </section>
            {screenWidth > 1200 ? (
              <>
                <section className={styles["images-container"]}>
                  <img
                    src={
                      showShiny
                        ? selectedCard.frontShinyViewImageUrl
                        : selectedCard.frontViewImageUrl
                    }
                  />
                  <img
                    src={
                      showShiny
                        ? selectedCard.backShinyViewImageUrl
                        : selectedCard.backViewImageUrl
                    }
                  />
                </section>

                <section className={styles["pokemon-data-container"]}>
                  <p>Type: {selectedCard.type}</p>
                  <p>Height: {selectedCard.height}</p>
                  <p>Weight: {selectedCard.weight}</p>
                </section>
              </>
            ) : (
              <>
                <div
                  className={
                    styles["pokemon-data-and-shiny-checkbox-container"]
                  }
                >
                  <section className={styles["pokemon-data-container"]}>
                    <p>Type: {selectedCard.type}</p>
                    <p>Height: {selectedCard.height}</p>
                    <p>Weight: {selectedCard.weight}</p>
                  </section>
                  {showShiny ? (
                    <img
                      src={selectedCard.frontShinyViewImageUrl}
                      className={styles["pokemon-slide-up-image"]}
                    />
                  ) : (
                    <img
                      src={selectedCard.frontViewImageUrl}
                      className={styles["pokemon-slide-up-image"]}
                    />
                  )}
                </div>
              </>
            )}
          </>
        </Modal>
      )}
    </>
  );
}
