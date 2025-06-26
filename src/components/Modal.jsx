import { useRef, useEffect } from "react";
import styles from "../styles/components/modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  children
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);

  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClick={((e) => { if (e.target === dialogRef.current) onClose(); })}
      className={styles.modal}
    >
      <div className={styles["content-container"]}>
        {children}

        <button
          onClick={() => onClose()}
          className={styles["close-button"]}
        >
          &times;
        </button>
      </div>
    </dialog>
  );
}
