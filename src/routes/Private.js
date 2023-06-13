import { useState, useEffect } from "react";
import { auth } from "../firebaseConnection";
import { linkWithPopup, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [singned, setSingned] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, (user) => {
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
    return <div></div>;
  }

  if (!singned) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default Private;
