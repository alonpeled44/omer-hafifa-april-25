import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/screenContext";
import { useDigimonsDb } from "../libs/digimonsDbContext";
import Card from "../components/card";
import Select from "../components/Select";
import Modal from "../components/Modal";
import styles from "../styles/pages/index.module.css";
import pokemonBackImage from "../images/pikachu-back-image.png";

const sortOptions = {
  id: "Id",
  name: "Name",
  type: "Type",
  level: "Level",
};

export default function Home() {
  const [isOpen, setIsOpen] = useState({
    isSortOpen: false,
    isFilterOpen: false,
    isModalOpen: false,
  });
  const [selectedDigimon, setSelectedDigimon] = useState(null);

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
      setIsOpen((prev) => ({
        ...prev,
        isSortOpen: false,
        isFilterOpen: false,
      }));
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
              };
            } catch (err) {
              console.error(
                `Error fetching Digimon ${digimon.id}:`,
                err.message
              );

              properties[digimon.id] = {
                type: "error",
                level: "error",
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
    setIsOpen((prev) => ({
      ...prev,
      [isMulti ? "isFilterOpen" : "isSortOpen"]:
        !prev[isMulti ? "isFilterOpen" : "isSortOpen"],
    }));
  };

  const filteredDigimons = digimons
    .filter((digimon) => {
      const searchValueLowerCase = searchValue.toLowerCase();
      const matchesSearch =
        digimon.id.toString().startsWith(searchValue) ||
        digimon.name.toLowerCase().startsWith(searchValueLowerCase) ||
        digimonProperties[digimon.id].type
          .toLowerCase()
          .startsWith(searchValueLowerCase) ||
        digimonProperties[digimon.id].level
          .toLowerCase()
          .startsWith(searchValue);

      const matchesTypes =
        selectedTypes.length === 0 ||
        selectedTypes.includes(digimonProperties[digimon.id].type);

      return matchesSearch && matchesTypes;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case sortOptions.id:
          return a.id - b.id;

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

        case sortOptions.level:
          return digimonProperties[a.id].level.localeCompare(
            digimonProperties[b.id].level,
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
              digimon={
                digimonProperties[digimon.id] || {
                  type: "",
                  level: "",
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
                <p>#{selectedDigimon.id}</p>
              </div>
            </section>

            {screenWidth > 1200 ? (
              <>
                <section className={styles.images}>
                  <img src={selectedDigimon.image} />
                  <img src={pokemonBackImage.src} />
                </section>

                <section className={styles["digimon-details"]}>
                  <p>Type: {digimonProperties[selectedDigimon.id].type}</p>
                  <p>Level: {digimonProperties[selectedDigimon.id].level}</p>
                </section>
              </>
            ) : (
              <>
                <div className={styles["slide-up-card"]}>
                  <section className={styles["digimon-details"]}>
                    <p>Type: {digimonProperties[selectedDigimon.id].type}</p>
                    <p>Level: {digimonProperties[selectedDigimon.id].level}</p>
                  </section>

                  <img
                    src={selectedDigimon.image}
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
