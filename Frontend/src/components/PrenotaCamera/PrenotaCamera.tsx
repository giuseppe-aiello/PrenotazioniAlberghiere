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
  const [camereDisponibili, setCamereDisponibili] = useState<Camera[]>([]);
  const [cameraSelezionata, setCameraSelezionata] = useState(null);

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

  const handlePrenotaClick = (ID_Camera: string) => {
    // Funzione per prenotare una stanza
  };

  const cercaCamereDisponibili = () => {
    console.log(dateCheckin);
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
      <ul>
        {camereDisponibili.map((camera) => (
          <li key={camera.ID_Camera}>
            ID camera {camera.ID_Camera} - Tipo {camera.Tipo_camera} - Numero
            letti {camera.Numero_letti} - Servizi inclusi{" "}
            {camera.Servizi_inclusi} - Tariffa {camera.Tariffa} - Disponibilità{" "}
            {camera.Disponibilità}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrenotaCamera;
