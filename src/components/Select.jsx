export default function Select({ isOpen, setIsOpen, options, selectType}) {
  return (
    <div className={styles["select"]}>
      <button
        className={styles["button"]}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        {selectType} by
      </button>

      {isOpen && (
        <div className={styles["options"]}>
          {options.map((option) => (
            <button className={styles["option"]}>{option}</button>
          ))}
        </div>
      )}
    </div>
  );
}
