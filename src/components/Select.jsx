import styles from "../styles/components/select.module.css";

export default function Select({
  isOpen,
  setIsOpen,
  options,
  multiple,
  selectedOptions,
  setSelectedOptions,
}) {
  return (
    <div className={styles.select}>
      <button
        className={styles.head}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      ></button>

      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <button
              className={styles.option}
              onClick={() => {
                if (multiple) {
                  if (selectedOptions.includes(option)) {
                    setSelectedOptions(
                      selectedOptions.filter((type) => type !== option)
                    );
                  } else {
                    setSelectedOptions([...selectedOptions, option]);
                  }
                }
                else {
                  setSelectedOptions(option.value);
                }
              }}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
