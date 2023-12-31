import { useState, useEffect } from "react";
import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Private = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [singned, setSingned] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          };

          localStorage.setItem("@detailUser", JSON.stringify(userData));

          setLoading(false);
          setSingned(true);
        } else {
          setLoading(false);
          setSingned(false);
        }
      });
    }
    checkLogin();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>
          <FaSpinner className="loading-icon-private" />
        </h1>
      </div>
    );
  }

  if (!singned) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default Private;
