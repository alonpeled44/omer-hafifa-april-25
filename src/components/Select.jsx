import { useState } from "react";
import styles from "../styles/components/select.module.css";

export default function Select({ isOpen, setIsOpen, options, type }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleFilterSelection = (option) => {
    if (selectedTypes.includes(option)) {
      setSelectedTypes(selectedTypes.filter((type) => type !== option));
      console.log(selectedTypes);
    } else {
      setSelectedTypes([...selectedTypes, option]);
      console.log(selectedTypes);
    }
  };

  const handleSortSelection = (option) => {
    
  }

  return (
    <div className={styles.select}>
      <button
        className={styles.head}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        {type} by
      </button>

      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <button className={styles.option} onClick={() => {
              if(type==="filter")
              {
                handleFilterSelection(option);
              }
              else {

              }
            }}>
              {option} {selectedTypes.includes(option) ? "\u2713" : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
