const db = require("../dbconfig");
class UserController {
  async get(req, res) {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ message: "all user data", data: result });
    });
  }
  async getById(req, res) {
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
  }
  async post(req, res) {
    const { ...user } = req.body;
    const sql = `INSERT users (username,age,street,number,cep) VALUES ('${user.username}',${user.age},'${user.street}',${user.number},'${user.cep}')`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ message: "user inserted", data: user });
    });
  }
  async put(req, res) {
    const { id } = req.params;
    const { ...user } = req.body;
    const sql = `UPDATE users SET username = '${user.username}',age = ${user.age}, street = '${user.street}', number = ${user.number}, cep = '${user.cep}' WHERE id = ${id}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ message: "user updated" });
    });
  }
  async delete(req, res) {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = ${id}`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ message: "Number of users deleted: " + result.affectedRows });
    });
  }
}

module.exports = new UserController();
