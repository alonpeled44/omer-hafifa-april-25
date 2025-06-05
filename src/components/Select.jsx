import styles from "../styles/components/select.module.css";

export default function Select({ isOpen, setIsOpen, options, type}) {
  return (
    <div className={styles.select}>
      <button
        className={styles.button}
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
            <button className={styles.option}>{option}</button>
          ))}
        </div>
      )}
    </div>
  );
}
