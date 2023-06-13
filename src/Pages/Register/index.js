import { useState, useEffect } from "react";
import { db } from "../../firebaseConnection";
import { auth } from "../../firebaseConnection";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import logoCompass from "../../assets/img/LogoCompass.png";
import imgBackground from "../../assets/img/Backgorund.jpg";

//Styles
import "../LogIn/login.css";
import "./register.css";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [firtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBithDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setconfirmSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function newUser(e) {
    e.preventDefault();

    if (
      email === "" ||
      firtName === "" ||
      lastName === "" ||
      birthDate === "" ||
      country === "" ||
      city === "" ||
      senha === "" ||
      confirmSenha === ""
    ) {
      alert("Preencha todos os campos");
      setError("fill");
      return;
    }

    if (senha !== confirmSenha) {
      alert("As senhas não são iguais");
      setError("confirmPass");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);

      await addDoc(collection(db, "users"), {
        email,
        senha,
        firtName,
        lastName,
        birthDate,
        country,
        city,
      });

      console.log("Cadastrado com Sucesso");

      alert("Cadastrado com Sucesso");

      setFirstName("");
      setLastName("");
      setBithDate("");
      setCountry("");
      setCity("");
      setEmail("");
      setSenha("");
      setconfirmSenha("");
      setError("");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("emailUsed");
        alert("Email já cadastrado");
      } else if (error.code === "auth/invalid-email") {
        setError("email");
        alert("Email fornecido é inválido");
      } else if (error.code === "auth/weak-password") {
        setError("weakPass");
        alert(
          "A senha fornecida é fraca. Tente novamente com uma senha mais forte."
        );
      } else {
        setError("error");
        alert("Error ao cadastrar");
      }
    }
  }

  return (
    <div className="backgorund">
      <div className="container-register">
        <h1 className="big-title">Welcome,</h1>
        <p className="sub-title">Please, register to continue</p>

        <form className="form form-register">
          <div className="input-container">
            <span>first name</span>
            <input
              type="text"
              placeholder="Your first name"
              value={firtName}
              onChange={(e) => setFirstName(e.target.value)}
              className={
                error && firtName === "" ? "error-input" : "normal-input"
              }
            />
          </div>

          <div className="input-container">
            <span>last name</span>
            <input
              type="text"
              placeholder="Your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={
                error && lastName === "" ? "error-input" : "normal-input"
              }
            />
          </div>

          <div className="input-container">
            <span>birth date</span>
            <input
              type="date"
              placeholder="MM/DD/YYYY"
              value={birthDate}
              onChange={(e) => setBithDate(e.target.value)}
              className={
                error && birthDate === "" ? "error-input" : "normal-input"
              }
            />
          </div>

          <div className="input-container">
            <span>country</span>
            <input
              type="text"
              placeholder="Your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={
                error && country === "" ? "error-input" : "normal-input"
              }
            />
          </div>

          <div className="input-container">
            <span>city</span>
            <input
              type="text"
              placeholder="Your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={error && city === "" ? "error-input" : "normal-input"}
            />
          </div>

          <div className="input-container">
            <span>e-mail</span>
            <input
              type="text"
              placeholder="A valid e-mail here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                (error && email === "") ||
                error === "email" ||
                error === "emailUsed"
                  ? "error-input"
                  : "normal-input"
              }
            />
          </div>

          <div className="input-container">
            <span>password</span>
            <input
              type="password"
              placeholder="Your password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={
                (error && senha === "") ||
                error === "weakPass" ||
                error === "confirmPass"
                  ? "error-input"
                  : "normal-input"
              }
            />
          </div>

          <div className="input-container">
            <span>password</span>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmSenha}
              onChange={(e) => setconfirmSenha(e.target.value)}
              className={
                (error && confirmSenha === "") ||
                error === "weakPass" ||
                error === "confirmPass"
                  ? "error-input"
                  : "normal-input"
              }
            />
          </div>

          <button type="submit" onClick={newUser}>
            Register Now
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
