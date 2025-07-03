import styles from "../styles/components/select.module.css";

export default function Select({
  isOpen,
  setIsOpen,
  options,
  title,
  multiple,
  selectedOptions,
  setSelectedOptions
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
        {title}
      </button>

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
            >
              {multiple ? (
                <>
                  {option}
                  {selectedOptions.find((opt)=> opt===option) && <span>&#10003;</span>}
                </>
              ) : (
                option.label
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
