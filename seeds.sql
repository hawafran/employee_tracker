-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Accounting");
INSERT INTO department (name)
VALUE ("Legal");

-- ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 2);


-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kim", "Possible", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Shego", "Holm", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ron","Stopable",null,3);
