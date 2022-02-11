const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dev",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connected...");
});

app.get("/user", (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ message: "all user data", data: result });
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM users WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    const hasUserWithThisId = result.length > 0;

    if (err) throw err;

    if (hasUserWithThisId) {
      res.send({ data: result });
    } else {
      res.send({ message: "user not found" });
    }
  });
});

app.post("/user", (req, res) => {
  const { ...user } = req.body;
  const sql = `INSERT users (username,age,street,number,cep)
  VALUES ('${user.username}',${user.age},'${user.street}',${user.number},'${user.cep}')`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ message: "user inserted" });
  });
});

app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { ...user } = req.body;
  const sql = `UPDATE users SET username
   = '${user.username}', age = ${user.age}, street = '${user.street}', number = ${user.number}, cep = '${user.cep}'
    WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ message: "user updated" });
  });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ message: "Number of users deleted: " + result.affectedRows });
  });
});

app.listen(3000, () => {
  console.log("server running...");
});
