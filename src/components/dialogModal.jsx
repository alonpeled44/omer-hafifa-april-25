import { useRef, useEffect } from 'react';
import symbolXImage from "../images/pop-up-close-button-symbol.png"; 
import styles from "../styles/components/dialogModal.module.css";

export default function Modal({ isOpen, onClose, children, className, closeOnBackdropClick = true }) {
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
      if(typeof onClose === 'function')
      {
        onClose();
      }
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === dialogRef.current && typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className={styles["modal"]}
    >
      <div className={styles["content-container"]}>
        {children}
        <button onClick={() => onClose && typeof onClose === 'function' && onClose()} className={styles["close-button"]}>
          <img src={symbolXImage.src} alt='x-image'/>
        </button>
      </div>
    </dialog>
  );
}
