// const mysql = require('mysql');
const inquirer = require('inquirer');
// const connection = require('./employee_tracker.js');

const start = () => {
inquirer 
.prompt ({
    name: AddViewUpdate,
    type: list,
    message: "would you like to Add employees, View employees, or update employee roster?",
    Choices: ["Add", "View", "Update"],
})
}

start();