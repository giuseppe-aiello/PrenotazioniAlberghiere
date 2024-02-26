const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "il_tuo_segreto";

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
  console.log(req.query.id);
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

//port
app.listen(8081, () => {
  console.log("Listening...");
});
