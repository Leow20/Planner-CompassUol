import React from "react";
import "./modal.css";
import { Link } from "react-router-dom";

function Modal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Email not found</h2>
        <p>Would you like to create an account?</p>
        <Link className="link-modal" to={"/register"}>
          Create Account
        </Link>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Modal;
