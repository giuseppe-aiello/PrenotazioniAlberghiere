import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NotificationHandler } from "./../../../utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToAreaPrenotazioni, setRedirectToAreaPrenotazioni] =
    useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", { email, password })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data);
        if (!res.data.ID_Cliente) {
          NotificationHandler.instance.error(res.data);
          // Gestisci il caso in cui il token non è presente (ad esempio, l'utente non è autenticato)
          return Promise.reject("Utente non autenticato");
        }

        return axios
          .get("http://localhost:8081/area-prenotazioni", {
            params: {
              id: res.data.ID_Cliente,
            },
          })
          .then((res) => {
            if (res.data.authenticated) {
              setRedirectToAreaPrenotazioni(true);
            }
          })
          .catch((err) => {
            console.error(
              "Errore durante il recupero dell'area prenotazioni:",
              err
            );
            // Gestisci l'errore, ad esempio mostrando un messaggio di errore all'utente
            throw err; // Rilancia l'errore per gestirlo altrove, se necessario
          });
      })
      .catch((err) => console.log(err));
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (redirectToAreaPrenotazioni) {
      return navigate("/area-prenotazioni");
    }
  }, [redirectToAreaPrenotazioni]);

  return (
    <div>
      <h1>Prenotazioni Alberghiere</h1>
      <div className="login-box">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="field-wrapper">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="field-wrapper">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className="button">Login</button>
        </form>
      </div>
      <Link className="no-sign" to={"/register"}>
        Non sei registrato? Registrati subito
      </Link>
    </div>
  );
}
export default Login;
