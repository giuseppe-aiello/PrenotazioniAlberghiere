import "./../styles/main.scss";

import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AreaPrenotazioni from "./components/area-prenotazioni/area-prenotazioni";

import { BrowserRouter, Route, Routes } from "react-router-dom";

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
      </Routes>
    </BrowserRouter>
  );
};
export default App;
