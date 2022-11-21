const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'BBC--0822',
    database: 'employees_db'
  },
  console.log(`Connected to the books_db database.`)
);

const mainMenu = [
  {
    name: 'Main Menu',
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
    ],
  }
];

const addDepartment = [
  {
    name: 'Add a Department',
    type: 'input',
    message: 'Which department would you like to add?',
  }
];

const addRole = [
  {
    name: 'Role Name',
    type: 'input',
    message: 'What is the name of the Role would you like to add?',
  },
  {
    name: 'Salary',
    type: 'input',
    message: 'What is the salary of the role?',
  },
  {
    name: 'Role Department',
    type: 'list',
    message: 'In which department does the role belong?',
    choices: [],
  }
];

const addEmployee = [
  {
    name: 'Employee First Name',
    type: 'input',
    message: 'What is the First Name of the employee?',
  },
  {
    name: 'Employee Last Name',
    type: 'input',
    message: 'What is the Last Name of the employee?',
  },
  {
    name: 'Employee Role',
    type: 'list',
    message: 'What is the role of the employee?',
    choices: [],
  },
  {
    name: 'Employee Manager',
    type: 'list',
    message: 'Who is the manager of the employee?',
    choices: [],
  }
];

const updateRole = [
  {
    name: 'Employee to Update',
    type: 'list',
    message: 'Which employee needs their role updated?',
    choices: [],
  },
  {
    name: 'Updated Role',
    type: 'list',
    message: 'What is the new role of the employee?',
    choices: [],
  }
];

function init() {
  inquirer
    .prompt(mainMenu)
    .then(response => {

    })
};

init()