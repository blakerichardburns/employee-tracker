INSERT INTO department (name)
VALUES  ("Client Engagement"),
        ("Production"),


INSERT INTO role (title, salary, department_id)
VALUES  ("Account Manager", 50000, 1),
        ("Inventory Coordinator", 40000, 1),
        ("Director", 70000, 1),
        ("Kit Assembler", 30000, 2),
        ("Team Lead", 40000, 2),
        ("Floor Manager", 60000, 2)


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Blake", "Burns", 2, 2),
        ("Mandy", "Dickson", 3, null),
        ("Montavious", "Bentleyton", 1, 2),
        ("Dude", "Dood", 4, 6),
        ("Person", "Person", 4, 6),
        ("Sir", "Mister", 5, 6),
        ("Dick", "Tater", 6, null),