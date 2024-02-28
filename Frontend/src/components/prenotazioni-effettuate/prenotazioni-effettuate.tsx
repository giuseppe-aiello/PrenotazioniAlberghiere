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
    <div className="main-box">
      <h1>Prenotazioni Effettuate</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID Prenotazione</th>
            <th>Data Check-in</th>
            <th>Data Check-out</th>
            <th>ID Cliente</th>
            <th>ID Camera</th>
          </tr>
        </thead>
        <tbody>
          {prenotazioni.map((prenotazione) => (
            <tr key={prenotazione.ID_Prenotazione}>
              <td>{prenotazione.ID_Prenotazione}</td>
              <td>
                {new Date(prenotazione.Data_checkin).toLocaleDateString(
                  "en-GB"
                )}
              </td>
              <td>
                {new Date(prenotazione.Data_checkout).toLocaleDateString(
                  "en-GB"
                )}
              </td>
              <td>{prenotazione.ID_Cliente}</td>
              <td>{prenotazione.ID_Camera}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="back-button"
        onClick={() => {
          navigate("/area-prenotazioni");
        }}
      >
        Torna indietro
      </button>
    </div>
  );
}

export default PrenotazioneEffettuate;
