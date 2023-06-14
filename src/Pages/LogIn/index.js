import { useState } from "react";
import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

import { FaSpinner } from "react-icons/fa";
import userIcon from "../../assets/icons/icon-user.svg";
import passwordIcon from "../../assets/icons/icon-password.svg";
import logoCompass from "../../assets/img/LogoCompass.png";
import imgBackground from "../../assets/img/Backgorund.jpg";

//Styles
import "./login.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function sigIn(e) {
    e.preventDefault();
    setLoading(true);
    setErro(false);
    await signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        console.log("Logado com Sucesso");
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/user-not-found") {
          setErro(true);
          setIsModalOpen(true);
          console.log("Email não encontrado");
        } else {
          setErro(true);
          console.log("Erro ao logar", error);
        }
      });
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="backgorund">
      <div className="container">
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        <h1 className="big-title">Welcome,</h1>
        <p className="sub-title">
          To continue browsing safely, log in to the network.
        </p>

        <form className="form">
          <h3>Login</h3>
          <div className="input-container">
            <input
              type="text"
              placeholder="user name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={erro && erro ? "error-input" : "normal-input"}
            />
            <img className="user-icon" src={userIcon} alt="icone de usuario" />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={erro && erro ? "error-input" : "normal-input"}
            />
            <img
              className="pass-icon"
              src={passwordIcon}
              alt="icone de password"
            />
          </div>
          {erro && (
            <span className="warning-login">
              Wow, invalid username or password. Please, try again!
            </span>
          )}

          <button type="submit" onClick={sigIn}>
            {loading ? <FaSpinner className="loading-icon" /> : "Log In"}
          </button>
        </form>
      </div>
      <div className="logo-compass">
        <img src={logoCompass} alt="Logo Compass UOL" />
      </div>
      <div className="img-background">
        <img src={imgBackground} alt="Imagem Background" />
      </div>
    </div>
  );
};

export default LogIn;
