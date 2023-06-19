import React from "react";
import "./modal.css";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConnection";
import { toast } from "react-toastify";

function Modal({ isOpen, onClose, Confirm, date }) {
  if (!isOpen) {
    return null;
  }
  const collectionRef = collection(db, "tarefas");

  const q = query(collectionRef, where("day", "==", `${date}`));

  async function handleDeleteTasks() {
    try {
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);
      toast.success("Todas as tarefas foram deletadas com sucesso!");
      onClose();
    } catch (error) {
      toast.warn("Erro ao deletar tarefas!");
      console.error(error);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {Confirm === "Confirm"
            ? `You sure you want to delete all tasks from ${date}?`
            : "Email not found"}
        </h2>
        <p>
          {Confirm === "Confirm" ? `` : "Would you like to create an account?"}
        </p>

        {Confirm !== "Confirm" && (
          <Link className="link-modal" to={"/register"}>
            Create a Account
          </Link>
        )}
        {Confirm === "Confirm" && (
          <button onClick={handleDeleteTasks}>Confirm</button>
        )}

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default Modal;
