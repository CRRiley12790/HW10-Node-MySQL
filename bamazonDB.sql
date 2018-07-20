DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(200) NULL,
department_name VARCHAR(45) NULL,
price DECIMAL(5,2) NULL,
stock_quantity VARCHAR (45) NULL,
PRIMARY KEY (id)
);

SELECT * FROM bamazon_db.products;

INSERT INTO products
(id, product_name, department_name, price, stock_quantity)
VALUES
(1, "Echo Dot (2nd Generation) - Smart Speaker", "Electronics", 29.99, 1006),
(2, "Traeger Grills TFB38TCA Renegade", "Patio", 489.30, 81),
(3, "Under Armour Boys Eliminator Shorts", "Sports Apparel", 19.95, 234),
(4, "Fire TV Cube", "Electronics", 89.99, 101),
(5, "Power Wheels Kawasaki Lil Quad", "Toys and Games", 49.99, 79),
(6, "Harry Potter: Complete 8-Film Collection", "Movies and TV", 28.99, 156),
(7, "Goodthreads Mens Short-Sleeve Denim Shirt", "Mens Clothing", 30.00, 543),
(8, "One A Day Mens Multivitamin", "Health", 14.24, 2348),
(9, "Calphalon Stainless Steel 3 Piece Set", "Cooking", 76.99, 23),
(10, "CopperJoint Compression Knee Sleeve", "Sports Apparel", 18.97, 678)