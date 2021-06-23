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
      switch (answer.action) {
        case 'View Employees':
            employeeView();
            break;

        case 'View Departments':
            viewDept();
            break;

        case 'View Roles':
            roleView();
            break;

        case 'Add Employees':
            employeeAdd();
            break

        case 'Add Departments':
            departmentAdd();
            break

        case 'Add Roles':
            roleAdd();
            break

        case 'Update Employee Role':
            employeeUpdate();
            break

        case 'Exit':
            connection.end();
            break;
    };
} catch (err) {
    console.log(err);
    initiateApp();
};
}
// Selection to view all of the employees.
const employeeView = async () => {
  console.log('Employee View');
  try {
      let query = 'SELECT * FROM employee';
      connection.query(query, function (err, res) {
          if (err) throw err;
          let employeeArray = [];
          res.forEach(employee => employeeArray.push(employee));
          console.table(employeeArray);
          initiateApp();
      });
  } catch (err) {
      console.log(err);
      initiateApp();
  };
  }
  

  const viewDept = async () => {
    
  try {
      let query = 'SELECT * FROM department';
      connection.query(query, function (err, res) {
          if (err) throw err;
          let departmentArray = [];
          res.forEach(department => departmentArray.push(department));
          console.table(departmentArray);
          initiateApp();
      });
  } catch (err) {
      console.log(err);
      initiateApp();
  };
  }
  
  
};
}