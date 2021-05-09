const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "database-2.cq2opjffhoxv.ap-south-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "password",
  database: "products",
  multipleStatements: true,
});

module.exports = connection;
