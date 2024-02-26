import React, { useEffect, useState } from "react";

function AreaPrenotazioni() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica se l'utente è autenticato
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      // Reindirizza l'utente alla pagina di login se non è autenticato
      window.location.href = "/login";
    }
  }, []);

  if (!loggedIn) {
    return null; // Puoi rendere un messaggio di "accesso negato" o reindirizzare l'utente al login
  }

  return (
    <div>
      <h1>Area Prenotazioni</h1>
      {/* Contenuto dell'area riservata */}
    </div>
  );
}

export default AreaPrenotazioni;
