import "./../styles/main.scss";

import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AreaPrenotazioni from "./components/area-prenotazioni/area-prenotazioni";
import PrenotazioniEffettuate from "./components/prenotazioni-effettuate/prenotazioni-effettuate";
import PrenotaCamera from "./components/PrenotaCamera/PrenotaCamera";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./../node_modules/react-toastify/scss/main.scss";

const App = () => {
  //   useEffect(() => {
  //     fetch("http://localhost:8081/Cliente")
  //       .then((res) => res.json())
  //       .then((data) => console.log())
  //       .catch((err) => console.log(err));
  //   }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/area-prenotazioni" element={<AreaPrenotazioni />} />
        <Route
          path="/prenotazioni-effettuate"
          element={<PrenotazioniEffettuate />}
        />
        <Route path="/prenota" element={<PrenotaCamera />} />
        <Route path="/success" element={<>Prenotazione effettuata</>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};
export default App;
