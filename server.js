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
  });
};

function viewRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log("Error");
    } console.table(results);
    init();
  });
};

function viewEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.log("Error");
    } console.table(results);
    init();
  });
};

function createDepartment() {
  inquirer
  .prompt(addDepartment)
  .then(response => {
    db.query(`INSERT INTO department (name) VALUES ("${response.addDepartment}");`);
    db.query("SELECT * FROM department", (err, results) => {
      if (err) {
        console.log("Error");
      } console.table(results);
      console.log(`${response.addDepartment} department successfully added!`);
      init();
    });
  });
  
};

function createRole() {

  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log("Error");
    };
    let departments = results.map(({ id, name }) => ({ value: id, name: `${id} ${name}` }));
    let departmentsArray = [];

    for (let i = 0; i < departments.length; i++) {
      departmentsArray.push(departments[i].name);
    };
      var addRole = [
        {
          name: 'roleName',
          type: 'input',
          message: 'What is the name of the Role would you like to add?',
        },
        {
          name: 'roleSalary',
          type: 'input',
        message: 'What is the salary of the role?',
      },
      {
        name: 'roleDepartment',
        type: 'list',
        message: 'In which department does the role belong?',
        choices: departmentsArray
      }
    ];

    inquirer
    .prompt(addRole)
    .then(response => {
        let departmendIdString = response.roleDepartment
        let departmentIdArray = departmendIdString.split(" ");
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${response.roleName}", "${response.roleSalary}", "${departmentIdArray[0]}");`);
      db.query("SELECT * FROM role", (err, results) => {
        if (err) {
          console.log("Error");
        } console.table(results);
        console.log(`${response.roleName} role successfully added!`);
        init();
        });
    });
  });
};

// function createEmployee() {
  
//   };
  
//   function updateRole() {
    
//     };