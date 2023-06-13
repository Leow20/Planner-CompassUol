import { useState } from "react";
import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import userIcon from "../../assets/icons/icon-user.svg";
import passwordIcon from "../../assets/icons/icon-password.svg";
import logoCompass from "../../assets/img/LogoCompass.png";
import imgBackground from "../../assets/img/Backgorund.jpg";

//Styles
import "./login.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function sigIn(e) {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        console.log(value.user);
        console.log("Logado com Sucesso");
      })
      .catch(() => {
        console.log("Error ao logar");
      });
  }

  return (
    <div className="backgorund">
      <div className="container">
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
            />
            <img src={userIcon} alt="icone de usuario" />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <img src={passwordIcon} alt="icone de password" />
          </div>

          <button type="submit" onClick={sigIn}>
            Log In
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
