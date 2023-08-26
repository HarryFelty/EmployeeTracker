import inquirer from "inquirer";

let { query } = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'query',
            message: "Select a query.",
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

