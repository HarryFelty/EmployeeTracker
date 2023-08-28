create database employees_db;

use employees_db;

create table departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

create table roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

create table employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

insert into departments(name)
values('Sales'), ('Marketing'), ('Finance');

insert into roles(title, salary, department_id)
values ('Sales Associate', '15.00', '1'),
       ('Marketing Manager', '40.00', '2'),
       ('Accountant', '30.00', '3');

insert into employees(first_name, last_name, role_id, manager_id)
values ('Frodo', 'Baggins', '1', '2'),
       ('Samwise', 'Gamgee', '2',),
       ('Bilbo', 'Baggins', '3', NULL); 