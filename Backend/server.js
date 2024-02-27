const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "prenotazioni_alberghiere",
});

//API
// app.get('/', (req, res)=> {
//     return res.json("From Backend side");
// })

// app.get('/Cliente', (req, res)=> {
//     const sql = "SELECT * FROM Cliente";
//     db.query(sql, (err, data)=>{
//         if(err) return res.json(err);
//         return res.json(data);
//     })
// })

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM Cliente WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      const cliente = {
        ID_Cliente: data[0].ID_Cliente,
        Nome: data[0].Nome,
        Cognome: data[0].Cognome,
        Indirizzo: data[0].Indirizzo,
        Numero_telefono: data[0].Numero_telefono,
        Email: data[0].Email,
        Nazionalità: data[0].Nazionalità,
        Data_nascita: data[0].Data_nascita,
        // Potresti aggiungere altre informazioni qui se necessario
      };
      return res.json(cliente);
    } else return res.json("Nessun cliente registrato con queste credenziali.");
  });
});

app.post("/register", (req, res) => {
  const sql =
    "INSERT INTO Cliente (Nome, Cognome, Indirizzo, Numero_telefono, Email, Nazionalità, Data_nascita, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  if (
    !req.body.name ||
    !req.body.surname ||
    !req.body.address ||
    !req.body.number ||
    !req.body.email ||
    !req.body.nation ||
    !req.body.birth_date ||
    !req.body.password
  ) {
    return res.json("Uno o più campi mancanti!");
  }

  db.query(
    sql,
    [
      req.body.name,
      req.body.surname,
      req.body.address,
      req.body.number,
      req.body.email,
      req.body.nation,
      req.body.birth_date,
      req.body.password,
    ],
    (err, data) => {
      if (err) {
        console.log("ERROR REGISTRATION", err);
        return res.json("Error");
      }
    }
  );

  const sql2 = "SELECT ID_Cliente FROM Cliente WHERE email = ?";
  db.query(sql2, req.body.email, (err, data) => {
    if (err) {
      console.log("Errore del server interno", err);
      return res.json("Error");
    }
    if (data.length === 0) {
      return res.status(401).json({ error: "ID_Cliente non esistente." });
    }
    const clienteId = data[0].ID_Cliente;
    cliente = {
      ID_Cliente: clienteId,
      Nome: req.body.name,
      Cognome: req.body.surname,
      Indirizzo: req.body.address,
      Numero_telefono: req.body.number,
      Email: req.body.email,
      Nazionalità: req.body.nation,
      Data_nascita: req.birth_date,
      // Potresti aggiungere altre informazioni qui se necessario
    };
    return res.json(cliente);
  });
});

// function authenticateToken(req, res, next) {
//   console.log(req.query.id);
//   const token = req.query.id;
//   const sql = "SELECT * FROM Cliente WHERE ID_Cliente = ?";
//   db.query(sql, [token], (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Internal server error" });
//     }
//     if (data.length === 0) {
//       return res.status(401).json({ error: "Token not found in database" });
//     }
//   });
//   // L'utente è autenticato, puoi restituire le risorse riservate
//   res.json("AUTENTICATO");
//   next();
// }

app.get("/area-prenotazioni", (req, res) => {
  const token = req.query.id;
  const sql = "SELECT * FROM Cliente WHERE ID_Cliente = ?";
  db.query(sql, [token], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (data.length === 0) {
      return res.status(401).json({ error: "Utente non trovato nel database" });
    }
  });

  // L'utente è autenticato, puoi restituire le risorse riservate
  res.json({ authenticated: true });
});

app.post("/prenotazioni", (req, res) => {
  const user = req.body;
  const sql = "SELECT * FROM Prenotazione WHERE ID_Cliente = ?";
  db.query(sql, user.ID_Cliente, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (data.length === 0) {
      return res.status(401).json({ error: "Nessuna prenotazione" });
    }
    res.json(data);
  });
});
app.get("/stanze-disponibili", (req, res) => {
  const dataCheckin = req.query.dataCheckin;
  const dataCheckout = req.query.dataCheckout;
  if (!dataCheckin || !dataCheckout) {
    return res.status(401).json({ error: "Data invalida" });
  }
  const sql = //checkin                                //checkout
    "SELECT DISTINCT c.* FROM Camera c JOIN Prenotazione p ON c.ID_Camera = p.ID_Camera WHERE NOT EXISTS (SELECT * FROM Prenotazione p2 WHERE p2.ID_Camera = c.ID_Camera AND (p2.Data_checkin <= ? AND p2.Data_checkout >= ? OR p2.Data_checkin <= ? AND p2.Data_checkout >= ? OR p2.Data_checkin >= ? AND p2.Data_checkout <= ?));";
  db.query(
    sql,
    [
      dataCheckin,
      dataCheckout,
      dataCheckin,
      dataCheckout,
      dataCheckin,
      dataCheckout,
    ],
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (data.length === 0) {
        return res
          .status(401)
          .json({ error: "Camere non disponibili per quella data" });
      }
      res.json(data);
    }
  );
});

//port
app.listen(8081, () => {
  console.log("Listening...");
});
