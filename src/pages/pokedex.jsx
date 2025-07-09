import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import { pokemons, types } from "../components/pokemons";
import Card from "../components/card";
import Select from "../components/Select";
import Modal from "../components/Modal";
import styles from "../styles/pages/pokedex.module.css";

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "type", label: "Type" },
  { value: "id", label: "Id" },
  { value: "height", label: "Height" },
  { value: "weight", label: "Weight" },
];

export default function pokedex() {
  const [isOpen, setIsOpen] = useState({
    isSortOpen: false,
    isFilterOpen: false,
    isModalOpen: false,
  });
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showShiny, setShowShiny] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const { screenWidth } = useScreenWidth();

  useEffect(() => {
    // closing sort and filter lists when user click outside their space.
    const handleClickOnScreen = () => {
      setIsOpen((prev)=> {
        const prevIsOpen = {...prev}; //state before being set.
        prevIsOpen.isSortOpen = false; 
        prevIsOpen.isFilterOpen = false;
        return prevIsOpen;
      });
    };

    document.addEventListener("click", handleClickOnScreen);
    return () => document.removeEventListener("click", handleClickOnScreen);
  });

  const setFilterOrSortOpen = (isMulti) => {
    //setter for either sort or filter list to open when closed/close when open when user click on the button above the list.
    setIsOpen((prev)=> {
      const prevIsOpen = {...prev}; // state before being set.
      prevIsOpen[isMulti ? "isFilterOpen" : "isSortOpen"] = !prevIsOpen[isMulti ? "isFilterOpen" : "isSortOpen"];
      return prevIsOpen;
    });
  };

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
        selectedTypes.includes(pokemon.type);

      return matchesSearch && matchesTypes;
    })
    .sort((a, b) => {
      switch (sortOption) {
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
          return;
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
              isOpen={isOpen.isFilterOpen}
              setIsOpen={() => setFilterOrSortOpen(true)}
              options={types}
              title="filter by"
              multiple={true}
              selectedOptions={selectedTypes}
              setSelectedOptions={setSelectedTypes}
            />

            <Select
              isOpen={isOpen.isSortOpen}
              setIsOpen={() => setFilterOrSortOpen(false)}
              options={sortOptions}
              title="sort by"
              multiple={false}
              selectedOptions={sortOption}
              setSelectedOptions={setSortOption}
            />
          </section>
        </div>

        <div
          className={styles["pokemons-container"]}
          data-is-centered={filteredPokemons.length < pokemons.length || undefined}
        >
          {filteredPokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              card={pokemon}
              onClick={() => {
                setSelectedPokemon(pokemon);
                setIsOpen((prev)=> {
                  //open card selected by user.
                  const prevIsOpen = {...prev}; //state before being set.
                  prevIsOpen.isModalOpen = !prevIsOpen.isModalOpen;
                  return prevIsOpen;
                });
              }}
            />
          ))}
        </div>
      </div>

      {isOpen.isModalOpen && (
        <Modal
          isOpen={isOpen.isModalOpen}
          onClose={() => {
            setIsOpen((prev)=> {
              //closing pop up card.
              const prevIsOpen = {...prev}; //state before being set.
              prevIsOpen.isModalOpen = !prevIsOpen.isModalOpen;
              return prevIsOpen;
            });
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
