const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'nodedb'
});


connection.connect();

router.post('/', function (req, res, next) {
  const sql = "INSERT INTO `nodedb`.`qs` (`js`, `age`, `name`, `sentence`, `relax`, `tel`) VALUES (?,?,?,?,?,?)";
  const sqlQ = "select * from qs order by id desc limit 1";
  const sqlData = [req.body.js, req.body.age, req.body.name, req.body.name, req.body.sentence, req.body.relax, req.body.tel];
  connection.query(sql, sqlData, function (err, rows, fields) {
    if (err) {
      return res.status(500).send(err)
    } else {
      connection.query(sqlQ, function (err, rows, fields) {
        if (err) {
          return res.status(500).send(err)
        } else {
          res.send(rows)
        }
      });
    }
  });
});

module.exports = router;
