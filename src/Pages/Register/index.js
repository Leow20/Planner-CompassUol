import { useState } from "react";
import { db } from "../../firebaseConnection";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

import countries from "../../assets/slim-3.json";

import logoCompass from "../../assets/img/LogoCompass.png";
import imgBackground from "../../assets/img/Backgorund.jpg";

//Styles
import "../LogIn/login.css";
import "./register.css";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const [firtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setconfirmSenha] = useState("");
  const [error, setError] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const regex =
    /^(?=.*[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[0-9]).+$/;

  async function newUser(e) {
    e.preventDefault();

    if (!isAdult) {
      setError("notAdult");
      return;
    }

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
      setError("fill");
      return;
    }

    if (!regex.test(senha)) {
      setError("weakPass");
      return;
    }

    if (senha !== confirmSenha) {
      setError("confirmPass");
      return;
    }

    try {
      setLoading(true);
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

      setFirstName("");
      setLastName("");
      setBirthDate("");
      setCountry("");
      setCity("");
      setEmail("");
      setSenha("");
      setconfirmSenha("");
      setError("");
      toast.success("Usuario cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setError("emailUsed");
      } else if (error.code === "auth/invalid-email") {
        setError("email");
      } else if (error.code === "auth/weak-password") {
        setError("weakPass");
      } else {
        setError("error");
      }
    }
  }

  const handleBirthDateChange = (event) => {
    const inputDate = new Date(event.target.value);
    setBirthDate(event.target.value);

    const currentDate = new Date();
    const adultDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    setIsAdult(inputDate <= adultDate);
  };

  const handleFirstNameChange = (event) => {
    const capitalizedFirstName = capitalizeFirstLetter(event.target.value);
    setFirstName(capitalizedFirstName);
  };

  const handleLastNameChange = (event) => {
    const capitalizedLastName = capitalizeFirstLetter(event.target.value);
    setLastName(capitalizedLastName);
  };

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="backgorund">
      <main className="main-register">
        <div className="container">
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
                  onChange={handleFirstNameChange}
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
                  onChange={handleLastNameChange}
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
                  onChange={handleBirthDateChange}
                  className={
                    (error && birthDate === "") || error === "notAdult"
                      ? "error-input"
                      : "normal-input"
                  }
                />
              </div>

              <div className="input-container">
                <span>country</span>
                <select
                  id="country"
                  value={country}
                  placeholder="Your country"
                  onChange={(e) => setCountry(e.target.value)}
                  className={
                    error && country === ""
                      ? "error-input input-select"
                      : "normal-input input-select"
                  }
                >
                  <option value="">Selecione um país</option>
                  {countries.map((country) => (
                    <option key={country.alpha2Code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-container">
                <span>city</span>
                <input
                  type="text"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={
                    error && city === "" ? "error-input" : "normal-input"
                  }
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

              {error === "notAdult" && (
                <span className="warning-register">
                  You must be at least 18 years old!.
                </span>
              )}

              {error === "email" && (
                <span className="warning-register">
                  Please check the email format.
                </span>
              )}

              {error === "emailUsed" && (
                <span className="warning-register">
                  Email already registered.<>&nbsp;</>
                  <Link to={"/"}> Please try to log in.</Link>
                </span>
              )}

              {error === "fill" && (
                <span className="warning-register">
                  Please fill in the required fields indicated.
                </span>
              )}

              {error === "weakPass" && (
                <span className="warning-register">
                  The password must contain 6 digits, 1 special character, 1
                  uppercase letter, and 1 number.
                </span>
              )}

              {error === "confirmPass" && (
                <span className="warning-register">
                  The two passwords do not match.
                </span>
              )}

              <button type="submit" onClick={newUser}>
                {loading ? (
                  <FaSpinner className="loading-icon" />
                ) : (
                  "Register Now"
                )}
              </button>
            </form>

            <div className="link-register">
              <p>
                If you already have an account, please{" "}
                <Link to={"/"}>log in.</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="img-container-login">
          <div className="img-background">
            <img src={imgBackground} alt="Imagem Background" />
            <div className="logo-compass">
              <img src={logoCompass} alt="Logo Compass UOL" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
