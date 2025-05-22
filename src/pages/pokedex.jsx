import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import { pokemonCardsArray } from "../components/pokemonCards";
import Card from "../components/card";
import Modal from "../components/dialogModal";
import styles from "../styles/pages/pokedex.module.css";
export default function pokedex() {
  const sortOptionsArray = ["1", "2", "3", "4", "5", "6", "7"];
  const filterOptionsArray = ["1", "2", "3", "4", "5", "6", "7"];
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showShinyOnly, setShowShinyOnly] = useState(false);
  const { screenWidth } = useScreenWidth();

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
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleShinyFilterChange = (event) => {
    setShowShinyOnly(event.target.checked);
  };

  return (
    <div className={styles["pokedex-page-container"]}>
      <div className={styles["custom-cards-container"]}>
        {screenWidth > 1200 && <input type="text" placeholder="Search..." />}
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
          {screenWidth > 1200 ? (
            <>
              <section className={styles["id-name-control-pop-up-container"]}>
                <p>{selectedCard.name}</p>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={showShinyOnly}
                      onChange={handleShinyFilterChange}
                    />
                    Shiny
                  </label>
                  <p>#{selectedCard.id}</p>
                </div>
              </section>

              {showShinyOnly ? (
                <section className={styles["images-container"]}>
                  <img src={selectedCard.frontShinyViewImageUrl} />
                  <img src={selectedCard.backShinyViewImageUrl} />
                </section>
              ) : (
                <section className={styles["images-container"]}>
                  <img src={selectedCard.frontViewImageUrl} />
                  <img src={selectedCard.backViewImageUrl} />
                </section>
              )}

              <section className={styles["pokemon-data-container"]}>
                <p>Type: {selectedCard.type}</p>
                <p>Height: {selectedCard.height}</p>
                <p>Weight: {selectedCard.weight}</p>
              </section>
            </>
          ) : (
            <>
              <div
                className={styles["pokemon-data-and-shiny-checkbox-container"]}
              >
                <section className={styles["id-name-control-pop-up-container"]}>
                  <p>{selectedCard.name}</p>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={showShinyOnly}
                        onChange={handleShinyFilterChange}
                      />
                      Shiny
                    </label>
                    <p>#{selectedCard.id}</p>
                  </div>
                </section>

                <section className={styles["pokemon-data-container"]}>
                  <p>Type: {selectedCard.type}</p>
                  <p>Height: {selectedCard.height}</p>
                  <p>Weight: {selectedCard.weight}</p>
                </section>
              </div>
              {showShinyOnly ? (
                <section className={styles["images-container"]}>
                  <img src={selectedCard.frontShinyViewImageUrl} />
                </section>
              ) : (
                <section className={styles["images-container"]}>
                  <img src={selectedCard.frontViewImageUrl} />
                </section>
              )}
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
