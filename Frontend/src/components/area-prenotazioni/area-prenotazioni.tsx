import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function AreaPrenotazioni() {
  const [loggedIn, setLoggedIn] = useState(false);

  //   useEffect(() => {
  //     // Verifica se l'utente è autenticato

  //     const userString = localStorage.getItem("token");
  //     const user = JSON.parse(userString);
  //     console.log(user.Email);
  //     if (userString) {
  //       setLoggedIn(true);
  //     } else {
  //       setLoggedIn(false);
  //       // Reindirizza l'utente alla pagina di login se non è autenticato
  //     }
  //   }, []);
  //mettere LOGGEDIN

  const navigate = useNavigate();

  return (
    <div className="main-box">
      <h1>Area Prenotazioni</h1>
      <div className="choice-box">
        <button
          onClick={() => {
            navigate("/prenotazioni-effettuate");
          }}
        >
          Prenotazioni Effettuate
        </button>
        <button
          onClick={() => {
            navigate("/prenota");
          }}
        >
          Prenota Camera
        </button>
      </div>
    </div>
  );
}

export default AreaPrenotazioni;
