var inquirer = require("inquirer");
var mysql = require("mysql");
var server = require("../server");
var view = require("./view");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "onetwothree",
    database: "employee_trackerDB"
});

exports.add= () => {
   view.getAllRoles(function(rolesResults) {
      var roles = [];
      for(var i = 0; i < rolesResults.length; i++) {
          roles.push(rolesResults[i].title);
      }
       var options = [
        {
            type: "input",
            message: "First Name",
            name: "firstName",
            default: "Jane"
        },
        {
            type: "input",
            message: "Last Name",
            name: "lastName",
            default: "Doe"
        },
        {
            type: "list",
            message: "Role",
            name: "role",
            choices: roles
        }
        ];

        inquirer.prompt(options)
        .then((answers) => {
            var roleId = null;
            for(var i= 0; i < rolesResults.length; i++) {
                if(rolesResults[i].title === answers.role) {
                    roleId = rolesResults[i].role_id
                }
            }
            connection.query("Add to employee list?",
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    emp_role_id: roleId
                },
            function(err,results) {
                if(err) throw err;
                console.log("Successfully added " + answers.firstName + " " + answers.lastName );
                server.start();
            });
        });
    });
};
