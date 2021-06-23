var mysql = require("mysql");
var server = require("../server");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "onetwothree",
    database: "employee_trackerDB"
  });

exports.viewAllEmployees = () => {
   var queryString = "SELECT e.employee_id, e.first_name, e.last_name, title, salary, dept_name, " +
      "e2.first_name AS manager_first_name, e2.last_name AS manager_last_name " +
      "FROM employees AS E " +
      "INNER JOIN company_role AS C ON E.employee_role_id = c.role_id " +
      "INNER JOIN department AS D ON C.dept_id = d.dept_id " +
      "LEFT JOIN employees AS E2 ON E.manager_id = E2.employee_id;";
   
   connection.query(queryString, function(err,res) {
      if(err) {throw err}
      
      console.table(res)
       
    server.start();
   });
};

exports.getAllRoles = (cb) => {
 connection.query("SELECT * FROM company_role", function(err,results) {
      if(err) throw err;
      cb(results);
   });
}

exports.getAllDepartments = (cb) => {
    connection.query("SELECT * FROM department", function(err,results) {
      if(err) throw err;
      cb(results);
   });
}

exports.getAllEmployees = (cb) => {
   connection.query("SELECT * FROM employees", function(err,results) {
     if(err) throw err;
     cb(results);
  });
}