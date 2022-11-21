const db = require('./db/connection');
require('console.table');
const inquirer = require('inquirer');
const utils = require('util');
db.query = utils.promisify(db.query);


const mainMenu = [
  {
    name: 'mainMenu',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Quit'
    ],
  }
];

const addDepartment = [
  {
    name: 'addDepartment',
    type: 'input',
    message: 'Which department would you like to add?',
  }
];

const addRole = [
  {
    name: 'roleName',
    type: 'input',
    message: 'What is the name of the Role would you like to add?',
  },
  {
    name: 'salary',
    type: 'input',
    message: 'What is the salary of the role?',
  },
];

const addEmployee = [
  {
    name: 'employeeFirstName',
    type: 'input',
    message: 'What is the First Name of the employee?',
  },
  {
    name: 'employeeLastName',
    type: 'input',
    message: 'What is the Last Name of the employee?',
  }
];


function init() {
  inquirer
    .prompt(mainMenu)
    .then(response => {
      if (response.mainMenu === 'View all departments') {
        viewDepartments();
      } else if (response.mainMenu === 'View all roles') {
        viewRoles();
      } else if (response.mainMenu === 'View all employees') {
        viewEmployees();
      } else if (response.mainMenu === 'Add a department') {
        createDepartment();
      } else if (response.mainMenu === 'Add a role') {
        createRole();
      } else if (response.mainMenu === 'Add an employee') {
        createEmployee();
      } else if (response.mainMenu === 'Update an employee role') {
        updateRole();
      } else {
        process.exit();
      }
    })
};

init();

function viewDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log("Error");
    } console.table(results);
    init();
  })
};

function viewRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log("Error");
    } console.table(results);
    init();
  })
};

function viewEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.log("Error");
    } console.table(results);
    init();
  })
};

// function createDepartment() {

// };

// function createRole() {
//   db.query("SELECT * FROM department", (err, results) => {
//     if (err) {
//       console.log("Error")
//     } let departments = results.map(({ id, name }) => ({ value: id, name: name }))
//   })
//   inquirer
//     .prompt(addRole)
// };

// function createEmployee() {

// };

// function updateRole() {

// };