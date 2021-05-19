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

const start = () => {
    console.log("employee tracker")
inquirer 
.prompt ({
    name: choices,
    type: list,
    message: "would you like to Add employees, View employees, or update employee roster?",
    Choices: ["Add", "View", "Update"],
})
.then(function(val) {
    
    switch (val.choice) {
        case "View All Employees?":
          viewEmployees();
        break;

      case "View All Employee's By Roles?":
          viewRoles();
        break;
      case "View all Emplyees By Deparments":
          viewDepartments();
        break;

        case "Update Employee":
            updateEmployee();
          break;

        case "Add Employee?":
            addEmployee();
          break;
  
        case "Add Role?":
            addRole();
          break;
  
        case "Add Department?":
            addDepartment();
          break;
      

        }
})

}

function viewEmployees() {
    connection.query(
        "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        start()
    }
    
    )}
function viewRoles() {
    connection.query(
        "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            start()
        })
}

function viewDepartments() {
    connection.query (
        "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            start()
        }
    )
}

function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter last name "
        },
        {
          name: "role",
          type: "input",
          message: "What is their role? ",
        }
    ])
    .then((answer) => {
        connection.query(
            `INSERT INTO employees(first_name, last_name, role_id) VALUES(?, ?, 
            (SELECT id FROM roles WHERE title = ? ), 
            (SELECT id FROM (SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ? ) AS tmptable))`, [answer.first_ame, answer.last_name, answer.role]
        )
        start();
    })

}

connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

  module.exports = connection;