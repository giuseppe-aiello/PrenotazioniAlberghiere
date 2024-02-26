import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NotificationHandler } from "./../../../utils";

//Cliente (ID_Cliente, Nome, Cognome, Indirizzo,
//Numero_telefono, Email, Nazionalità, Data_nascita, Password)

export interface formResult {
  name: string;
  surname: string;
  address: string;
  number: string;
  email: string;
  nation: string;
  birth_date: string;
  password: string;
}

function Register() {
  const [redirectToAreaPrenotazioni, setRedirectToAreaPrenotazioni] =
    useState(false);
  const [information, setInformation] = useState<formResult>({
    name: "",
    surname: "",
    address: "",
    number: "",
    email: "",
    nation: "",
    birth_date: "",
    password: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/register", {
        name: information.name,
        surname: information.surname,
        address: information.address,
        number: information.number,
        email: information.email,
        nation: information.nation,
        birth_date: information.birth_date,
        password: information.password,
      })
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
            <label htmlFor="name">Nome </label>
            <input
              type="name"
              placeholder="Inserisci nome"
              className="form-control"
              onChange={(e) =>
                setInformation((old) => {
                  old.name = e.target.value;
                  return { ...old };
                })
              }
            ></input>
          </div>

          <div className="field-wrapper">
            <label htmlFor="surname">Cognome </label>
            <input
              type="surname"
              placeholder="Inserisci cognome"
              className="form-control"
              onChange={(e) =>
                setInformation((old) => {
                  old.surname = e.target.value;
                  return { ...old };
                })
              }
            ></input>
          </div>

          <div className="field-wrapper">
            <label htmlFor="address">Indirizzo</label>
            <input
              type="address"
              placeholder="Inserisci indirizzo"
              className="form-control"
              onChange={(e) =>
                setInformation((old) => {
                  old.address = e.target.value;
                  return { ...old };
                })
              }
            ></input>
          </div>

          <div className="field-wrapper">
            <label htmlFor="number">Numero</label>
            <input
              type="number"
              placeholder="Inserisci numero"
              className="form-control"
              onChange={(e) =>
                setInformation((old) => {
                  old.number = e.target.value;
                  return { ...old };
                })
              }
            ></input>
          </div>
          <div className="field-wrapper">
            <label htmlFor="nation">Nazionalità</label>
            <input
              type="nation"
              placeholder="Inserisci nazionalità"
              className="form-control"
              onChange={(e) =>
                setInformation((old) => {
                  old.nation = e.target.value;
                  return { ...old };
                })
              }
            ></input>
          </div>

          <div className="field-wrapper">
            <label htmlFor="birth_date">Nascita</label>
            <input
              type="birth_date"
              placeholder="Inserisci nascita"
              className="form-control"
              onChange={(e) =>
                setInformation((old) => {
                  old.birth_date = e.target.value;
                  return { ...old };
                })
              }
            ></input>
          </div>

          <div className="field-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Inserisci email"
              className="form-control"
              onChange={(e) =>
                setInformation((old) => {
                  old.email = e.target.value;
                  return { ...old };
                })
              }
            ></input>
          </div>

          <div className="field-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Inserisci password"
              className="form-control"
              onChange={(e) =>
                setInformation((old) => {
                  old.password = e.target.value;
                  return { ...old };
                })
              }
            ></input>
          </div>

          <button className="button">Sign up</button>
        </form>
      </div>
      <Link className="already-sign" to={"/"}>
        Sei già registrato? Accedi subito
      </Link>
    </div>
  );
}

export default Register;
