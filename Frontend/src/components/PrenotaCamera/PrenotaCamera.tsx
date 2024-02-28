import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NotificationHandler } from "../../../utils";

interface Camera {
  ID_Camera: string;
  Tipo_camera: string;
  Numero_letti: string;
  Servizi_inclusi: string;
  Tariffa: string;
  Disponibilità: string;
  // Altri campi delle prenotazioni
}

function PrenotaCamera() {
  const [dateCheckin, setDateCheckin] = useState("");
  const [dateCheckout, setDateCheckout] = useState("");
  const [camereDisponibili, setCamereDisponibili] = useState<Camera[]>([
    {
      ID_Camera: "N/D",
      Tipo_camera: "N/D",
      Numero_letti: "N/D",
      Servizi_inclusi: "N/D",
      Tariffa: "N/D",
      Disponibilità: "N/D",
    },
  ]);

  const navigate = useNavigate();

  const [cameraSelezionata, setCameraSelezionata] = useState(null);
  const [dettagliCamera, setDettagliCamera] = useState({
    ID_Camera: "N/D",
    Tariffa: "N/D",
    Numero_letti: "N/D",
  });

  const handleSelectCamera = (camera: Camera) => {
    setDettagliCamera(camera);
    setCameraSelezionata(camera.ID_Camera);
  };

  const handleCheckinDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateCheckin(event.target.value);
  };
  const handleCheckoutDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateCheckout(event.target.value);
  };

  const handlePrenotaClick = () => {
    console.log(cameraSelezionata);
    if (cameraSelezionata) {
      const userString = localStorage.getItem("token");
      if (userString) {
        const user = JSON.parse(userString);

        axios
          .post("http://localhost:8081/prenota", {
            user,
            dateCheckin,
            dateCheckout,
            cameraSelezionata,
          })
          .then(() => {
            navigate("/success/" + cameraSelezionata);
          })
          .catch((err) => {
            NotificationHandler.instance.error(err.response.data.error);
          });
      }

      console.log("Camera selezionata:", cameraSelezionata);
    } else {
      NotificationHandler.instance.error("Seleziona prima una camera.");
    }
  };

  const cercaCamereDisponibili = () => {
    axios
      .get(
        `http://localhost:8081/stanze-disponibili?dataCheckin=${dateCheckin}&dataCheckout=${dateCheckout}`
      )
      .then((res) => {
        setCamereDisponibili(res.data);
      })
      .catch((err) => {
        NotificationHandler.instance.error(err.response.data.error);

        console.error(
          "Errore durante il recupero delle stanze disponibili:",
          err
        );
      });
  };

  return (
    <div className="prenota-ora">
      <div className="seleziona-date-box">
        <h1>Prenotazione Stanze</h1>
        <label className="seleziona-date">
          Seleziona la data di checkin:
          <input
            type="date"
            value={dateCheckin}
            onChange={handleCheckinDateChange}
          />
          Seleziona la data di checkout:
          <input
            type="date"
            value={dateCheckout}
            onChange={handleCheckoutDateChange}
          />
        </label>
        <button onClick={cercaCamereDisponibili}>Cerca camere</button>
        <h3>Camere disponibili: </h3>
      </div>
      <ul>
        {camereDisponibili.map((camera) => (
          <li key={camera.ID_Camera}>
            ID camera {camera.ID_Camera} - Tipo {camera.Tipo_camera} - Numero
            letti {camera.Numero_letti} - Servizi inclusi{" "}
            {camera.Servizi_inclusi} - Tariffa {camera.Tariffa}
            <button
              className="select-button"
              onClick={() => handleSelectCamera(camera)}
            >
              Seleziona
            </button>
          </li>
        ))}
      </ul>
      <div className="camera-selezionata">
        <h3>Camera selezionata:</h3>
        {dettagliCamera && (
          <div>
            <p>ID: {dettagliCamera.ID_Camera}</p>
            <p>Prezzo: {dettagliCamera.Tariffa}</p>
            <p>Posti letto: {dettagliCamera.Numero_letti}</p>
          </div>
        )}
        <button onClick={handlePrenotaClick}>Prenota</button>
        <button
          className="back-button"
          onClick={() => {
            navigate("/area-prenotazioni");
          }}
        >
          Torna indietro
        </button>
      </div>
    </div>
  );
}

export default PrenotaCamera;
