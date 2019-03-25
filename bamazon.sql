DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40) NOT NULL,
    deparment_name VARCHAR(40),
    price FLOAT,
    stock_quantity INT,
    PRIMARY KEY(item_id)
    );


