import { useState } from "react";
import styles from "../styles/components/select.module.css";

export default function Select({
  isOpen,
  setIsOpen,
  options,
  type,
  selectedTypes,
  setSelectedTypes,
  sortOption,
  setSortOption
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
        {type==="sort" ? `sort by${options.find(opt => opt.value === sortOption)?.label}` : "filter by"}
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
                    console.log(selectedTypes);
                  } else {
                    setSelectedTypes([...selectedTypes, option]);
                    console.log(selectedTypes);
                  }
                }

                if(type==="sort")
                {
                  setSortOption(option.value);
                }
              }}
            >
              {type === 'filter' ? option : option.label}{' '}
              {type === 'filter' && selectedTypes.includes(option) ? "\u2713" : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
