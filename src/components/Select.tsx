import styles from "../styles/components/select.module.css";

interface SelectProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  options: string[];
  title: string;
  multiple: boolean;
  selectedOptions: string[] | string;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[] | string>>;
}

export default function Select({
  isOpen,
  setIsOpen,
  options,
  title,
  multiple,
  selectedOptions,
  setSelectedOptions,
}: SelectProps) {
  return (
    <div className={styles.select} data-sort-container={!multiple}>
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
                    setSelectedOptions((prev: string[]) =>
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
                  {(multiple && Array.isArray(selectedOptions)
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
