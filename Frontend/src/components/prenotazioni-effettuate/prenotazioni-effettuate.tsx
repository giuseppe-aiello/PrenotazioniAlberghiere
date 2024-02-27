import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
interface Prenotazione {
  ID_Prenotazione: string;
  Data_checkin: string;
  Data_checkout: string;
  ID_Cliente: string;
  ID_Camera: string;

  // Altri campi delle prenotazioni
}
function PrenotazioneEffettuate() {
  const [prenotazioni, setPrenotazioni] = useState<Prenotazione[]>([]);

  useEffect(() => {
    const userString = localStorage.getItem("token");
    if (userString) {
      const user = JSON.parse(userString);
      console.log(user.Email);

      axios
        .post("http://localhost:8081/prenotazioni", user)
        .then((res) => {
          setPrenotazioni(res.data);
        })
        .catch((err) => {
          console.error("Errore durante il recupero delle prenotazioni:", err);
        });
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className="main-box">
        <h1>Prenotazioni Effettuate</h1>

        <ul className="list">
          {prenotazioni.map((prenotazione) => (
            <li key={prenotazione.ID_Prenotazione}>
              {prenotazione.ID_Prenotazione} - {prenotazione.Data_checkin} -{" "}
              {prenotazione.Data_checkout} - {prenotazione.ID_Cliente} -{" "}
              {prenotazione.ID_Camera}
            </li>
          ))}
        </ul>
        <button
          style={{ backgroundColor: "red" }}
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

export default PrenotazioneEffettuate;
