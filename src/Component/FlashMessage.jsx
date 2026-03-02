import { useEffect } from "react";
import "./FlashMessage.css";

export default function FlashMessage({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`flash-message ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
}