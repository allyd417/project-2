const inquirer = require('inquirer');
const db = require('./Database/connection');
const mysql = require('mysql');
require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3001; // Change this to your desired port

// Set up Handlebars as the template engine
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'handlebars',
  exphbs({
    helpers: require('project-2/utils/helpers.js'),
    defaultLayout: require('project-2\views\layouts\main.handlebars'), // Specify your default layout file name
    // Other configuration options
  })
);
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Start server after the DB connection
db.connect((err) => {
  if (err) throw err;
  console.log('Database is Connected');
  Employee_Tracker();
});


// Function to handle the Employee Tracker application
function Employee_Tracker() {
  inquirer
    .prompt([
      {
        // Beginning of Command Line
        type: 'list',
        name: 'prompt',
        message: 'Hello user! What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a New Department',
          'Add a New Role',
          'Add a New Employee', //Needs a fix
          'Update an Existing Employee Role',
          'Update an Existing Department',
          // View Employee By Department
          //View Employee By Manager
          'Log Out',
        ], // Might add other elements later
      },
    ])
    .then((answers) => {
      // Should View the Department Table in the Database
      if (answers.prompt === 'View All Departments') {
        db.query(`SELECT * FROM department`, (err, result) => {
          if (err) throw err;
          console.log('Viewing All Departments: ');
          console.table(result);
          Employee_Tracker();
        });
      }
      // Should view all roles Table in the Database
      else if (answers.prompt === 'View All Roles') {
        db.query(`SELECT * FROM role`, (err, result) => {
          if (err) throw err;
          console.log('Viewing All Roles: ');
          console.table(result);
          Employee_Tracker();
        });
      }
      // Should view all employees in the Database
      else if (answers.prompt === 'View All Employees') {
        db.query(`SELECT * FROM employee`, (err, result) => {
          if (err) throw err;
          console.log('Viewing All Employees: ');
          console.table(result);
          Employee_Tracker();
        });
      }
      // Should View Add a New Department in the DataBase
      else if (answers.prompt === 'Add a New Department') {
        inquirer
          .prompt([
            {
              // Adding a Department
              type: 'input',
              name: 'department',
              message: 'What is the name of the department?',
              validate: (departmentInput) => {
                if (departmentInput) {
                  return true;
                } else {
                  console.log('Please Add A Department!');
                  return false;
                }
              },
            },
          ])
          .then((answers) => {
            db.query(
              `INSERT INTO department (name) VALUES (?)`,
              [answers.department],
              (err, result) => {
                if (err) throw err;
                console.log(`Added ${answers.department} to the database.`);
                Employee_Tracker();
              }
            );
          });
      }

      // Should View Add a New Role in the DataBase
      else if (answers.prompt === 'Add a New Role') {
        // Beginning with the database so that we may acquire the departments for the choice
        db.query(`SELECT * FROM department`, (err, result) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                // Adding A Role
                type: 'input',
                name: 'role',
                message: 'What is the name of the role?',
                validate: (roleInput) => {
                  if (roleInput) {
                    return true;
                  } else {
                    console.log('Please Add A Role!');
                   
                    return false;
                  }
                },
              },
              {
                // Adding the Salary
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
                validate: (salaryInput) => {
                  if (salaryInput) {
                    return true;
                  } else {
                    console.log('Please Add A Salary!');
                    return false;
                  }
                },
              },
              {
                // Department
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].name);
                  }
                  return array;
                },
              },
            ])
            .then((answers) => {
              // Comparing the result and storing it into the variable
              for (var i = 0; i < result.length; i++) {
                if (result[i].name === answers.department) {
                  var department = result[i];
                }
              }

              db.query(
                `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
                [answers.role, answers.salary, department.id],
                (err, result) => {
                  if (err) throw err;
                  console.log(`Added ${answers.role} to the database.`);
                  Employee_Tracker();
                }
              );
            });
        });
      }

      // Should View Update an Existing Employee Role in the DataBase
      else if (answers.prompt === 'Update an Existing Employee Role') {
        // Calling the database to acquire the roles and managers
        db.query(`SELECT * FROM employee, role`, (err, result) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                // Choose an Employee to Update
                type: 'list',
                name: 'employee',
                message: 'Which employee\'s role do you want to update?',
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].last_name);
                  }
                  var employeeArray = [...new Set(array)];
                  return employeeArray;
                },
              },
              {
                // Updating the New Role
                type: 'list',
                name: 'role',
                message: 'What is their new role?',
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].title);
                  }
                  var newArray = [...new Set(array)];
                  return newArray;
                },
              },
            ])
            .then((answers) => {
              // Comparing the result and storing it into the variable
              for (var i = 0; i < result.length; i++) {
                if (result[i].last_name === answers.employee) {
                  var name = result[i];
                }
              }
      
              for (var i = 0; i < result.length; i++) {
                if (result[i].title === answers.role) {
                  var role = result[i];
                }
              }
      
              const updateQuery = `UPDATE employee SET role_id = ? WHERE last_name = ?`;
      
              db.query(updateQuery, [role.id, name.last_name], (err, result) => {
                if (err) throw err;
                console.log(`Updated ${answers.employee}'s role in the database.`);
                Employee_Tracker();
              });
            });
        });
      }
      

    // Should View Update an Existing Department in the DataBase
else if (answers.prompt === 'Update an Existing Department') {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    console.log('Update an Existing Department');
    console.table(result);
    inquirer
      .prompt([
        {
          // Choose a Department to Update
          type: 'list',
          name: 'departmentId',
          message: 'Which department do you want to update?',
          choices: result.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
        {
          // Provide the New Name for the Department
          type: 'input',
          name: 'newName',
          message: 'Enter the new name for the department:',
          validate: (newNameInput) => {
            if (newNameInput) {
              return true;
            } else {
              console.log('Please enter a new name for the department!');
              return false;
            }
          },
        },
      ])
      .then((answers) => {
        db.query(
          `UPDATE department SET name = ? WHERE id = ?`,
          [answers.newName, answers.departmentId],
          (err, result) => {
            if (err) throw err;
            console.log('Department updated successfully.');
            Employee_Tracker();
          }
        );
      });
  });
}

      // Should let the User be able to log out.
      else if (answers.prompt === 'Log Out') {
        console.log('Logging Out');
        process.exit()
      }
    })
  };

  // Start server after the DB connection
db.connect((err) => {
  if (err) throw err;
  console.log('Database is Connected');
  Employee_Tracker();
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});