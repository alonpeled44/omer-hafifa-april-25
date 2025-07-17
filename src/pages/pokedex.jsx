import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import { useDigimonsDb } from "../libs/digimonsDbContext";
import Card from "../components/card";
import Select from "../components/Select";
import Modal from "../components/Modal";
import styles from "../styles/pages/pokedex.module.css";
import pokemonBackImage from "../images/pikachu-back-image.png";
import pokemonFrontShinyImage from "../images/pikachu-front-shiny-image.png";
import pokemonBackShinyImage from "../images/pikachu-back-shiny-image.png";

const sortOptions = {
  name: "Name",
  type: "Type",
  id: "Id",
  level: "Level",
  field: "Field",
};

export default function pokedex() {
  const [isOpen, setIsOpen] = useState({
    isSortOpen: false,
    isFilterOpen: false,
    isModalOpen: false,
  });
  const [selectedDigimon, setSelectedDigimon] = useState(null);
  const [showShiny, setShowShiny] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [digimonProperties, setDigimonProperties] = useState({});

  const { screenWidth } = useScreenWidth();
  const { digimons } = useDigimonsDb();

  useEffect(() => {
    // closing sort and filter lists when user click outside their space.
    const handleClickOnScreen = () => {
      setIsOpen((prev) => {
        const prevIsOpen = { ...prev }; //state before being set.
        prevIsOpen.isSortOpen = false;
        prevIsOpen.isFilterOpen = false;
        return prevIsOpen;
      });
    };

    document.addEventListener("click", handleClickOnScreen);
    return () => document.removeEventListener("click", handleClickOnScreen);
  });

  useEffect(() => {
    const fetchDigimonDetails = async () => {
      try {
        const properties = {};
        await Promise.all(
          digimons.map(async (digimon) => {
            try {
              const response = await fetch(digimon.href);
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch Digimon ${digimon.id}: ${response.status}`
                );
              }
              const data = await response.json();
              properties[digimon.id] = {
                type: data.types?.[0]?.type || "unknown",
                level: data.levels?.[0]?.level || "negative",
                field: data.fields?.[0]?.field || "none",
              };
            } catch (err) {
              console.error(
                `Error fetching Digimon ${digimon.id}:`,
                err.message
              );
              properties[digimon.id] = {
                type: "error",
                level: "error",
                field: "error",
              };
            }
          })
        );
        setDigimonProperties(properties);
      } catch (err) {
        console.error("Error fetching Digimon details:", err.message);
      }
    };

    if (digimons.length > 0) {
      fetchDigimonDetails();
    }
  }, [digimons]);

  useEffect(() => {
    setTypes([
      ...new Set(Object.values(digimonProperties).map((item) => item.type)),
    ]);
  }, [digimonProperties]);

  const setFilterOrSortOpen = (isMulti) => {
    //setter for either sort or filter list to open when closed/close when open when user click on the button above the list.
    setIsOpen((prev) => {
      const prevIsOpen = { ...prev }; // state before being set.
      prevIsOpen[isMulti ? "isFilterOpen" : "isSortOpen"] =
        !prevIsOpen[isMulti ? "isFilterOpen" : "isSortOpen"];
      return prevIsOpen;
    });
  };

  const filteredDigimons = digimons
    .filter((digimon) => {
      const searchValueLowerCase = searchValue.toLowerCase();
      const matchesSearch =
        digimon.name.toLowerCase().startsWith(searchValueLowerCase) ||
        digimonProperties[digimon.id].type
          .toLowerCase()
          .startsWith(searchValueLowerCase) ||
        digimon.id.toString().startsWith(searchValue) ||
        digimonProperties[digimon.id].level
          .toLowerCase()
          .startsWith(searchValue) ||
        digimonProperties[digimon.id].field
          .toLowerCase()
          .startsWith(searchValue);

      const matchesTypes =
        selectedTypes.length === 0 ||
        selectedTypes.includes(digimonProperties[digimon.id].type);

      return matchesSearch && matchesTypes;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case sortOptions.name:
          return a.name.localeCompare(b.name, undefined, {
            sensitivity: "base",
          });

        case sortOptions.type:
          return digimonProperties[a.id].type.localeCompare(
            digimonProperties[b.id].type,
            undefined,
            {
              sensitivity: "base",
            }
          );

        case sortOptions.id:
          return a.id - b.id;

        case sortOptions.level:
          return digimonProperties[a.id].level.localeCompare(
            digimonProperties[b.id].level,
            undefined,
            {
              sensitivity: "base",
            }
          );

        case sortOptions.field:
          return digimonProperties[a.id].field.localeCompare(
            digimonProperties[b.id].field,
            undefined,
            {
              sensitivity: "base",
            }
          );
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
              options={Object.values(sortOptions)}
              title="sort by"
              multiple={false}
              selectedOptions={sortOption}
              setSelectedOptions={setSortOption}
            />
          </section>
        </div>

        <div
          className={styles["digimons-container"]}
          data-is-centered={
            filteredDigimons.length < digimons.length || undefined
          }
        >
          {filteredDigimons.map((digimon) => (
            <Card
              key={digimon.id}
              card={digimon}
              digimonProperties={
                digimonProperties[digimon.id] || {
                  type: "",
                  level: "",
                  field: "",
                }
              }
              onClick={() => {
                setSelectedDigimon(digimon);
                setIsOpen((prev) => {
                  //open card selected by user.
                  const prevIsOpen = { ...prev }; //state before being set.
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
            setIsOpen((prev) => {
              //closing pop up card.
              const prevIsOpen = { ...prev }; //state before being set.
              prevIsOpen.isModalOpen = !prevIsOpen.isModalOpen;
              return prevIsOpen;
            });
            setSelectedDigimon(null);
          }}
        >
          <>
            <section className={styles["digimon-profile"]}>
              <p>{selectedDigimon.name}</p>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={showShiny}
                    onChange={(event) => setShowShiny(event.target.checked)}
                  />
                  Shiny
                </label>

                <p>#{selectedDigimon.id}</p>
              </div>
            </section>

            {screenWidth > 1200 ? (
              <>
                <section className={styles.images}>
                  <img
                    src={
                      showShiny
                        ? pokemonFrontShinyImage.src
                        : selectedDigimon.image
                    }
                  />
                  <img
                    src={
                      showShiny
                        ? pokemonBackShinyImage.src
                        : pokemonBackImage.src
                    }
                  />
                </section>

                <section className={styles["digimon-details"]}>
                  <p>Type: {digimonProperties[selectedDigimon.id].type}</p>
                  <p>Height: {digimonProperties[selectedDigimon.id].level}</p>
                  <p>Weight: {digimonProperties[selectedDigimon.id].field}</p>
                </section>
              </>
            ) : (
              <>
                <div className={styles["slide-up-card"]}>
                  <section className={styles["digimon-details"]}>
                    <p>Type: {digimonProperties[selectedDigimon.id].type}</p>
                    <p>Height: {digimonProperties[selectedDigimon.id].level}</p>
                    <p>Weight: {digimonProperties[selectedDigimon.id].field}</p>
                  </section>

                  <img
                    src={
                      showShiny
                        ? frontShinyViewImageUrl.src
                        : selectedDigimon.image
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
