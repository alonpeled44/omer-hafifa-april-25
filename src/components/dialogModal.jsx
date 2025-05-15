import { useRef, useEffect } from 'react';
import styles from "../styles/components/dialogModal.module.css";

export default function Modal({ isOpen, onClose, children, closeOnBackdropClick = true }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
    >
      <div className={styles["modal-container"]}>
        {children}
        <button onClick={onClose} className={styles["close-button"]}>
          Close
        </button>
      </div>
    </dialog>
  );
}
