import styles from "../styles/components/select.module.css";

export default function Select({
  isOpen,
  setIsOpen,
  options,
  type,
  selectedTypes,
  setSelectedTypes,
  sortOption,
  setSortOption,
}) {
  return (
    <div className={styles.select}>
      <button
        className={styles.head}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        {type === "sort"
          ? `${options.find((opt) => opt.value === sortOption)?.label || ""}`
          : "filter by"}
      </button>

      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <button
              className={styles.option}
              onClick={() => {
                if (type === "filter") {
                  if (selectedTypes.includes(option)) {
                    setSelectedTypes(
                      selectedTypes.filter((type) => type !== option)
                    );
                  } else {
                    setSelectedTypes([...selectedTypes, option]);
                  }
                }

                if (type === "sort") {
                  setSortOption(option.value);
                }
              }}
            >
              {type === "filter" ? option : option.label}
              {type === "filter" && selectedTypes.includes(option) && (<span>&#10003;</span>)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
