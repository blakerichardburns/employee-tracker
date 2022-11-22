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
      console.log("Error with Department Query");
    } console.table(results);
    init();
  });
};

function viewRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log("Error with Role Query");
    } console.table(results);
    init();
  });
};

function viewEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.log("Error with Employee Query");
    } console.table(results);
    init();
  });
};

function createDepartment() {
  
  const addDepartment = [
    {
      name: 'addDepartment',
      type: 'input',
      message: 'Which department would you like to add?',
    }
  ];
  
  inquirer
  .prompt(addDepartment)
  .then(response => {
    db.query(`INSERT INTO department (name) VALUES ("${response.addDepartment}");`);
    db.query("SELECT * FROM department", (err, results) => {
      if (err) {
        console.log("Error with Deparment Query");
      } console.table(results);
      console.log(`${response.addDepartment} department successfully added!`);
      init();
    });
  });
};

function createRole() {
  
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log("Error with Department Query");
    };
    let departments = results.map(({ id, name }) => ({ value: id, name: `${id} ${name}` }));
    let departmentsArray = [];
    
    for (let i = 0; i < departments.length; i++) {
      departmentsArray.push(departments[i].name);
    };
    const addRole = [
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
      let departmendIdString = response.roleDepartment;
      let departmentIdArray = departmendIdString.split(" ");
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${response.roleName}", "${response.roleSalary}", "${departmentIdArray[0]}");`);
      db.query("SELECT * FROM role", (err, results) => {
        if (err) {
          console.log("Error with Role Query");
        } console.table(results);
        console.log(`${response.roleName} role successfully added!`);
        init();
      });
    });
  });
};

function createEmployee() {
  
  db.query("SELECT * FROM role", (roleErr, roleResults) => {
    if (roleErr) {
      console.log("Error with Role Query");
    };
    let roles = roleResults.map(({ id, title }) => ({ value: id, name: `${id} ${title}` }));
    let rolesArray = [];

  db.query("SELECT * FROM employee", (employeeErr, employeeResults) => {
    if (employeeErr) {
      console.log("Error with Employee Query");
    };
    let employees = employeeResults.map(({ id, first_name, last_name }) => ({ value: id, name: `${id} ${first_name} ${last_name}` }));
    let employeesArray = [];
    
    for (let i = 0; i < roles.length; i++) {
      rolesArray.push(roles[i].name);
    };
    for (let j = 0; j < employees.length; j++) {
      employeesArray.push(employees[j].name);
    };

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
      },
      {
        name: 'employeeRole',
        type: 'list',
        message: 'What is the role of the employee?',
        choices: rolesArray
      },
      {
        name: 'employeeManager',
        type: 'list',
        message: 'To whom does the employee report?',
        choices: employeesArray
      }
    ];
    
    inquirer
    .prompt(addEmployee)
    .then(response => {
      let roleIdString = response.employeeRole;
      let roleIdArray = roleIdString.split(" ");
      let managerIdString = response.employeeManager;
      let managerIdArray = managerIdString.split(" ");
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.employeeFirstName}", "${response.employeeLastName}", "${roleIdArray[0]}", "${managerIdArray[0]}");`);
      db.query("SELECT * FROM employee", (err, results) => {
        if (err) {
          console.log("Error with Employee Query");
        } console.table(results);
        console.log(`Employee ${response.employeeFirstName} ${response.employeeLastName} has been succesfully added!`);
        init();
      });
      });
    });
    });
  };
  
  //   function updateRole() {
    
    //     };