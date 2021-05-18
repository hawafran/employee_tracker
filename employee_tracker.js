const mysql = require('mysql');
const inquirer = require('inquirer');



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'onetwothree',
    database: 'employee_trackerdb',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

  module.exports = connection;