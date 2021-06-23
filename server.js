const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');


let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'onetwothree',
    database: 'employee_trackerDB'
});

connection.query = util.promisify(connection.query);

