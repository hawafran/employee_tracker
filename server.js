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
            addEmployee();
            break

        case 'Add Departments':
            addDepartment();
            break

        case 'Add Roles':
            addRole();
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
  // Selection to view all of the roles.
  const roleView = async () => {
    console.log('Role View');
    try {
        let query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);
            initiateApp();
        });
    } catch (err) {
        console.log(err);
        initiateApp();
    };
    }
    
    
    const addEmployee = async () => {
    try {
    
        let roles = await connection.query("SELECT * FROM role");
    
    
    
        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Employee First Name'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Employee Last Name'
            },
            {
                name: 'Employee Role',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        
                    }
                }),
                message: "Employee Role"
            },
            {
                name: 'Employee ID',
                type: 'list',
                choices: id.map((employee) => {
                    return {
                        name: employee.first_name + " " + employee.last_name,
                        value: employee.id
                    }
                }),
                message: "Employee ID"
            }
        ])
    
        let result = await connection.query("Add to employee list ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role: (answer.role),
            id: (answer.id)
        });
    
    
    } catch (err) {
        console.log(err);
        initiateApp();
    };
    }
    
    // Selection to add a new department.
    const addDepartment = async () => {
      try {
      
          let answer = await inquirer.prompt([
              {
                  name: 'deptName',
                  type: 'input',
                  message: 'Department Name?'
              }
          ]);
      
          let result = await connection.query("Add to list?", {
              department_name: answer.deptName
          });
      
      } catch (err) {
          console.log(err);
          initiateApp();
      };
      }
      
      const addRole = async () => {
        try {

        
            let departments = await connection.query("SELECT * FROM department")
        
            let answer = await inquirer.prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'Role?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Salary?'
                },
            ]);
            
            let chosenDepartment;
            for (i = 0; i < departments.length; i++) {
                if(departments[i].department_id === answer.choice) {
                    chosenDepartment = departments[i];
                };
            }
            let result = await connection.query("Add to list?", {
                title: answer.title,
                salary: answer.salary,
            })
        
            console.log(`${answer.title} role added successfully.\n`)
            initiateApp();
        
        } catch (err) {
            console.log(err);
            initiateApp();
        };
        }
  
    
  
};
}