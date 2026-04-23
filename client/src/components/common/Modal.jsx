import { useEffect } from "react";
import { createPortal } from "react-dom";
import "../../assets/css/Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    ✕
                </button>

                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;