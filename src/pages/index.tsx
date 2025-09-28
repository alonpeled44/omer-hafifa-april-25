import { useEffect, useState } from "react";
import { useScreenWidth } from "../libs/ScreenContext";
import { useDigimonsDb } from "../libs/DigimonsDbContext";
import { getErrorMessage } from "@/libs/errors";
import Card from "../components/card";
import Select from "../components/Select";
import Modal from "../components/Modal";
import styles from "../styles/pages/index.module.css";

enum sortOptions {
  Id = "Id",
  Name = "Name",
}

interface Digimon {
  id: number;
  name: string;
  image: string;
  href: string;
}

interface DigimonProperties {
  [key: number]: {
    type: string;
    level: string;
  };
}

type ModalState = {
  isSortOpen: boolean;
  isFilterOpen: boolean;
  isModalOpen: boolean;
};

export default function Home() {
  const screenWidth = useScreenWidth();
  const { digimons, types } = useDigimonsDb();

  const [isOpen, setIsOpen] = useState<ModalState>({
    isSortOpen: false,
    isFilterOpen: false,
    isModalOpen: false,
  });
  const [digimonProperties, setDigimonProperties] = useState<DigimonProperties>(
    {}
  );
  const [selectedDigimon, setSelectedDigimon] = useState<Digimon | null>(null);

  const [searchValue, setSearchValue] = useState<string>("");

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [sortOption, setSortOption] = useState<string>("");

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
    const fetchDigimonProperties = async (): Promise<void> => {
      try {
        const properties: DigimonProperties = {};

        await Promise.all(
          digimons.map(async (digimon: Digimon) => {
            try {
              const response = await fetch(digimon.href);

              if (!response.ok) {
                throw new Error(
                  `Failed to fetch Digimon ${digimon.id}: ${response.status}`
                );
              }

              const data: {
                types?: { type: string }[];
                levels?: { level: string }[];
              } = await response.json(); // ensures that types and levels are array of objects. ? sign prevents error when either types or levels weren't found.

              properties[digimon.id] = {
                type: data.types?.[0]?.type || "unknown",
                level: data.levels?.[0]?.level || "negative",
              };
            } catch (err: unknown) {
              console.error(
                `Error fetching Digimon ${digimon.id}:`,
                getErrorMessage(err)
              );

              properties[digimon.id] = {
                type: "unknown",
                level: "unknown",
              };
            }
          })
        );

        setDigimonProperties(properties);
      } catch (err: unknown) {
        console.error("Error fetching Digimon details:", getErrorMessage(err));
      }
    };

    if (digimons.length > 0) {
      fetchDigimonProperties();
    }
  }, [digimons]);

  const setFilterOrSortOpen = (isMulti: boolean) => {
    //setter for either sort or filter list to open when closed/close when open when user click on the button above the list.
    setIsOpen((prev) => ({
      ...prev,
      [isMulti ? "isFilterOpen" : "isSortOpen"]:
        !prev[isMulti ? "isFilterOpen" : "isSortOpen"],
    }));
  };

  const filteredDigimons = digimons
    .filter((digimon: Digimon) => {
      const searchValueLowerCase = searchValue.toLowerCase();
      const matchesSearch =
        digimon.id.toString().startsWith(searchValue) ||
        digimon.name.toLowerCase().startsWith(searchValueLowerCase) ||
        digimonProperties[digimon.id].type
          .toLowerCase()
          .startsWith(searchValueLowerCase) ||
        digimonProperties[digimon.id].level
          .toLowerCase()
          .startsWith(searchValueLowerCase);

      const matchesTypes =
        selectedTypes.length === 0 ||
        selectedTypes.includes(digimonProperties[digimon.id].type);

      return matchesSearch && matchesTypes;
    })
    .sort((a: Digimon, b: Digimon) => {
      switch (sortOption) {
        case sortOptions.Id:
          return a.id - b.id;

        case sortOptions.Name:
          return a.name.localeCompare(b.name, undefined, {
            sensitivity: "base",
          });

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
              title="filter"
              multiple={true}
              selectedOptions={selectedTypes}
              setSelectedOptions={setSelectedTypes}
            />

            <Select
              isOpen={isOpen.isSortOpen}
              setIsOpen={() => setFilterOrSortOpen(false)}
              options={Object.values(sortOptions)}
              title="sort"
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
          {filteredDigimons.map((digimon: Digimon) => (
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
                setIsOpen((prev) => ({
                  ...prev,
                  isModalOpen: !prev.isModalOpen,
                }));
              }}
            />
          ))}
        </div>
      </div>

      {isOpen.isModalOpen && (
        <Modal
          isOpen={isOpen.isModalOpen}
          onClose={() => {
            setIsOpen((prev) => ({ ...prev, isModalOpen: !prev.isModalOpen }));
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
