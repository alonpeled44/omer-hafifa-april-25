import { useRef, useEffect } from "react";
import styles from "../styles/components/settings.module.css";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Settings({ isOpen, onClose, children }: SettingsProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className={styles.settings}
    >
      <div>
        {children}

        <button onClick={() => onClose()} className={styles["close-button"]}>
          &times;
        </button>
      </div>
    </dialog>
  );
}
