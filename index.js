const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12818885",
  password: "7Guxbd43ke",
  database: "sql12818885",
  port: 3306,
  connectTimeout: 20000,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

app.get("/find", (req, res) => {

  const acronym = req.query.acronym;

  if (!acronym) {
    return res.status(400).json({ message: "Acronym is required" });
  }

  const sql = "SELECT fullform FROM acronym WHERE UPPER(acronym) = ?";

  pool.query(sql, [acronym.toUpperCase()], (err, result) => {

    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: err.message });
    }

    if (result.length > 0) {
      res.json({ result: result[0].fullform });
    } else {
      res.status(404).json({ result: "Not in database" });
    }

  });

});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});