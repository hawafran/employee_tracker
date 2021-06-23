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


connection.connect(function (err) {
  if (err) throw err;
  initiateApp();
})

const initiateApp = async () => {
  try {
      let answer = await inquirer.prompt({
          name: 'action',
          type: 'list',
          message: 'What would you like to do?',
          choices: [
              'View Employees',
              'View Departments',
              'View Roles',
              'Add Employees',
              'Add Departments',
              'Add Roles',
              'Update Employee Role',
              'Exit'
          ]
      });
      
}