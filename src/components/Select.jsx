import styles from "../styles/components/select.module.css";

export default function Select({
  isOpen,
  setIsOpen,
  options,
  title,
  multiple,
  selectedOptions,
  setSelectedOptions,
}) {
  return (
    <div
      className={styles.select}
      sort-container={multiple ? undefined : "true"}
    >
      <button
        className={styles.head}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        {title}
      </button>

      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <button
              key={option}
              className={styles.option}
              onClick={() => {
                if (multiple) {
                  if (selectedOptions.includes(option)) {
                    setSelectedOptions((prev) =>
                      prev.filter((item) => item !== option)
                    );
                  } else {
                    setSelectedOptions((prev) => [...prev, option]);
                  }
                } else {
                  setSelectedOptions(option);
                }
              }}
            >
              {
                <>
                  {option}
                  {(multiple
                    ? selectedOptions.find((opt) => opt === option)
                    : option === selectedOptions) && <span>&#10003;</span>}
                </>
              }
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
