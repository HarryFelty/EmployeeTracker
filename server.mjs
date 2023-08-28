import express from 'express';
const PORT = process.env.PORT || 3001;
const app = express();
import mysql from 'mysql2';
import inquirer from 'inquirer';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

let { query } = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'query',
            message: "What would you like to do?",
            choices: [
                'View all Departments',
                'View all Roles',
                'View all Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ],
        }])

if (query === 'View all Departments') {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
    })
}
if (query === 'View all Roles') {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
    })
}
if (query === 'View all Employees') {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
    })
}
if (query === 'Add a Department') {
    let { deptName } = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'deptName',
                message: "Enter department name.",
            }])

    db.query(`INSERT INTO departments(name) VALUES('${deptName}')`, function (err, results) {
        console.log(`Department ${deptName} added.`);
    })
}
if (query === 'Add a Role') {
    let { roleTitle, salary, department_id } = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: "Enter role title.",
            },
            {
                type: 'input',
                name: 'salary',
                message: "Enter salary.",
            },
            {
                type: 'input',
                name: 'department_id',
                message: "Enter department ID.",
            }])

    db.query(`INSERT INTO roles(title, salary, department_id) VALUES('${roleTitle}', '${salary}', '${department_id}')`, function (err, results) {
        console.log(`Role ${roleTitle} added.`);
    })
}
if (query === 'Add an Employee') {
    let { firstName, lastName, role_id, manager_id } = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Enter employee's first name.",
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Enter employee's last name.",
            },
            {
                type: 'input',
                name: 'role_id',
                message: "Enter employee's role ID.",
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "Enter manager_id.",
            }])

    db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES('${firstName}', '${lastName}', '${role_id}', '${manager_id}')`, function (err, results) {
        console.log(`Employee ${firstName} ${lastName} added.`);
    })
}
if (query === 'Update an Employee Role') {
    let { employeeId, newRole } = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: "Enter employee's ID.",
            },
            {
                type: 'input',
                name: 'newRole',
                message: "Enter new role ID.",
            }])

    db.query(`UPDATE employees SET role_id = '${newRole}' WHERE id = '${employeeId}'`, function (err, results) {
        console.log(`Role changed successfully.`);
    })
}
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
