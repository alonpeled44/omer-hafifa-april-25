import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import { pokemons } from "../components/pokemons";
import Card from "../components/card";
import Select from "../components/Select";
import Modal from "../components/Modal";
import styles from "../styles/pages/pokedex.module.css";

const filterOptions = [
  "normal",
  "water",
  "fire",
  "electric",
  "Grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];
const sortOptions = [
  { value: "none", label: "sort-by" },
  { value: "name", label: "Name" },
  { value: "type", label: "Type" },
  { value: "id", label: "ID" },
  { value: "height", label: "Height" },
  { value: "weight", label: "Weight" },
];

export default function pokedex() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showShiny, setShowShiny] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("none");

  const { screenWidth } = useScreenWidth();

  useEffect(() => {
    const handleClickOnScreen = () => {
      setIsSortOpen(false);
      setIsFilterOpen(false);
    };

    document.addEventListener("click", handleClickOnScreen);
    return () => document.removeEventListener("click", handleClickOnScreen);
  });

  const filteredPokemons = pokemons
    .filter((pokemon) => {
      const searchValueLowerCase = searchValue.toLowerCase();
      const matchesSearch =
        pokemon.name.toLowerCase().startsWith(searchValueLowerCase) ||
        pokemon.type.toLowerCase().startsWith(searchValueLowerCase) ||
        pokemon.id.toString().startsWith(searchValue) ||
        pokemon.height.toString().startsWith(searchValue) ||
        pokemon.weight.toString().startsWith(searchValue);

      const matchesTypes =
        selectedTypes.length === 0 ||
        selectedTypes.includes(pokemon.type.toLowerCase());

      return matchesSearch && matchesTypes;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "none":
          return;
        case "name":
          return a.name.localeCompare(b.name, undefined, {
            sensitivity: "base",
          });

        case "type":
          return a.type.localeCompare(b.type, undefined, {
            sensitivity: "base",
          });

        case "id":
          return a.id - b.id;

        case "height":
          return a.height - b.height;

        case "weight":
          return a.weight - b.weight;

        default:
          return 0;
      }
    });

  return (
    <>
      <div className={styles["pokedex-content"]}>
        <div className={styles["control-bar"]}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
          <section className={styles["filter-and-sort-container"]}>
            <Select
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
              options={filterOptions}
              type="filter"
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
            />

            <Select
              isOpen={isSortOpen}
              setIsOpen={setIsSortOpen}
              options={sortOptions}
              type="sort"
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </section>
        </div>

        <div
          className={`${styles["pokemons-container"]} ${
            filteredPokemons.length < pokemons.length
              ? styles["centered"]
              : ""
          }`}
        >
          {filteredPokemons.map((pokemon) => (
            <Card
              card={pokemon}
              onClick={() => {
                setSelectedPokemon(pokemon);
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
            <section className={styles["pokemon-profile"]}>
              <p>{selectedPokemon.name}</p>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={showShiny}
                    onChange={(event) => setShowShiny(event.target.checked)}
                  />
                  Shiny
                </label>

                <p>#{selectedPokemon.id}</p>
              </div>
            </section>

            {screenWidth > 1200 ? (
              <>
                <section className={styles.images}>
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
                <div className={styles["slide-up-card"]}>
                  <section className={styles["pokemon-details"]}>
                    <p>Type: {selectedPokemon.type}</p>
                    <p>Height: {selectedPokemon.height}</p>
                    <p>Weight: {selectedPokemon.weight}</p>
                  </section>

                  <img
                    src={
                      showShiny
                        ? selectedPokemon.frontShinyViewImageUrl
                        : selectedPokemon.frontViewImageUrl
                    }
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
