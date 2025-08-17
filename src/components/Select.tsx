import styles from "../styles/components/select.module.css";

type SelectedValues<T extends boolean> = T extends true ? string[] : string;

interface SelectProps<T extends boolean> {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  options: string[];
  title: string;
  multiple: T;
  selectedOptions: SelectedValues<T>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedValues<T>>>;
}

export default function Select<T extends boolean>({
  isOpen,
  setIsOpen,
  options,
  title,
  multiple,
  selectedOptions,
  setSelectedOptions,
}: SelectProps<T>) {
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
                  setSelectedOptions((prev) => {
                    const currentOptions = prev as string[];
                    if (currentOptions.includes(option)) {
                      return currentOptions.filter(
                        (item) => item !== option
                      ) as SelectedValues<T>;
                    }
                    return [...currentOptions, option] as SelectedValues<T>;
                  });
                } else {
                  setSelectedOptions(option as SelectedValues<T>);
                }
              }}
            >
              {
                <>
                  {option}
                  {(multiple
                    ? (selectedOptions as string[]).find(
                        (opt) => opt === option
                      )
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
