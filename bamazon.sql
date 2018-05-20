DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Boots', 'Clothing', 99.99, 100),
       ('Pants', 'Clothing', 89.50, 250),
       ('Watch', 'Electronics', 145.49, 600),
       ('Speakers', 'Electronics', 66, 1250),
       ('Refrigerator', 'Appliances', 800, 50),
       ('Oven', 'Appliances', 600, 75),
       ('Soccer Ball', 'Sporting', 59.99, 2000),
       ('Tennis Racket', 'Sporting', 129.99, 750),
       ('Tylenol', 'Pharmacy', 9.99, 5000),
       ('Tooth Brush', 'Pharmacy', 5.99, 10000);
