import { useState } from "react";
import styles from "../styles/components/select.module.css";

export default function Select({ isOpen, setIsOpen, options, type}) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  console.log("gdf");
  
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
            <button
            className={styles.option}
            onClick={(option)=> {
              if(selectedTypes.includes(option))
              {
                setSelectedTypes(selectedTypes.filter((type)=> type!==option));
              }
              else{
                setSelectedTypes([...selectedTypes, option]);
                console.log(selectedTypes[0]);
              }
            }}
            >
              {option} {selectedTypes.includes(option) ? "&#10003" : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
