import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import { pokemons } from "../components/pokemons";
import Card from "../components/card";
import Select from "../components/Select";
import Modal from "../components/Modal";
import styles from "../styles/pages/pokedex.module.css";

export default function pokedex() {
  const sortOptions = ["1", "2", "3", "4", "5", "6", "7"];
  const filterOptions = ["1", "2", "3", "4", "5", "6", "7"];
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
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
      <div className={styles["pokedex-content"]}>
        <div className={styles["control-bar"]}>
          <input type="text" placeholder="Search..." />
          <section className={styles["filter-and-sort-container"]}>
            <Select isOpen={isFilterOpen}
             setIsOpen={setIsFilterOpen}
             options={filterOptions}
             type={"filter"} 
            />

            <Select isOpen={isSortOpen}
             setIsOpen={setIsSortOpen}
             options={sortOptions}
             type={"sort"} 
            />
          </section>
        </div>

        <div className={styles["pokemons-container"]}>
          {pokemons.map((card) => (
            <Card
              card={card}
              onClick={() => {
                setSelectedPokemon(card);
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
            setSelectedPokemon(null);
          }}
        >
          <>
            <section className={styles["pokemon-id-shiny-control"]}>
              <p>{selectedPokemon.name}</p>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={showShiny}
                    onChange={handleShinyChange}
                  />
                  Shiny
                </label>

                <p>#{selectedPokemon.id}</p>
              </div>
            </section>
            
            {screenWidth > 1200 ? (
              <>
                <section className={styles["images"]}>
                  <img
                    src={
                      showShiny
                        ? selectedPokemon.frontShinyViewImageUrl
                        : selectedPokemon.frontViewImageUrl
                    }
                  />
                  <img
                    src={
                      showShiny
                        ? selectedPokemon.backShinyViewImageUrl
                        : selectedPokemon.backViewImageUrl
                    }
                  />
                </section>

                <section className={styles["pokemon-details"]}>
                  <p>Type: {selectedPokemon.type}</p>
                  <p>Height: {selectedPokemon.height}</p>
                  <p>Weight: {selectedPokemon.weight}</p>
                </section>
              </>
            ) : (
              <>
                <div
                  className={
                    styles["slide-up-card"]
                  }
                >
                  <section className={styles["pokemon-details"]}>
                    <p>Type: {selectedPokemon.type}</p>
                    <p>Height: {selectedPokemon.height}</p>
                    <p>Weight: {selectedPokemon.weight}</p>
                  </section>
                  
                  <img 
                  src={showShiny ? selectedPokemon.frontShinyViewImageUrl : selectedPokemon.frontViewImageUrl}
                  className={styles["slide-up-image"]}
                  />
                </div>
              </>
            )}
          </>
        </Modal>
      )}
    </>
  );
}
