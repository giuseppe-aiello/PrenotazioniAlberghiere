import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function Success() {
  const navigate = useNavigate();

  const { id } = useParams();

  const getIdCliente = () => {
    const userString = localStorage.getItem("token");
    if (userString) {
      const user = JSON.parse(userString);
      return user.ID_Cliente;
    } else return "UNDEFINED";
  };

  return (
    <div className="main-box">
      <h1>Prenotazione effettuata ✓</h1>
      <p>
        Camera <span style={{ fontWeight: "bold" }}> {id}</span> prenotata per
        il cliente con id{" "}
        <span style={{ fontWeight: "bold" }}> {getIdCliente()}</span>{" "}
      </p>
      <br></br>
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

export default Success;
