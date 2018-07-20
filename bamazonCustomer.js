//npm install
var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console.table');

//connect to database in mySQL
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'braves1714',
    database: 'bamazon_db'
});

//Connect to Database
connection.connect(function (err) {
    if (err) throw err;
    showTable();
   
});

//Shows table
function showTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log("---Welcome to Bamazon!---");
        console.log("Top Sellers");

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        }
    });  itemRequest();
};

//Request input from user
function itemRequest() {
    inquirer.prompt([{
        name: "requestID",
        type: "input",
        message: "Enter ID of this item.",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
                console.log("\n Insufficient ID number entered. \nPlease enter the ID number of the item you wish to purchase, as it appears on the table.");
            }
        }
    }, {
        //Second request input from user
        name: "requestQuantity",
        type: "input",
        message: "Enter the quantity of this item.",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
                console.log("\nPlease enter a valid quantity of the item woudld like to purchase.");
            }
        }
    }])

        //Validating inputs from user
        .then(function (answer) {
            var inputId = (answer.requestID);
            var inputQuantity = parseInt(answer.requestQuantity);
            //var total = parseFloat(((res[inputId].price) * inputQuantity).toFixed(2));

            //is suffcient quantity?
            connection.query("select stock_quantity from products where id="+inputId+"", function (err, result) {
                if (err) throw err;
                console.log(result);
                console.log(result[0].stock_quantity);

            if (result[0].stock_quantity >= inputQuantity) {
                connection.query("UPDATE products SET ? WHERE ?", [
                    { stock_quantity: (result[0].stock_quantity - inputQuantity) },
                    { id: answer.requestID }
                ], function (err, result) {
                    if (err) throw err;
                 //   console.log("The total for your order is $" + total.toFixed(2) + " Thank you for choosing Bamazon! \n Your order will be shipped to you in 3-5 business days.");
                });
                //else display "cannot fill"
            } else {
                console.log("Sorry! Insufficient quantity! :(")
            }
            //something else?
            additionalRequest();
        });


        })
}
//whether the order is placed or not "Would you like something else?"
function additionalRequest() {
    //confirm input for yes or no for another order
    inquirer.prompt([{
        name: "addItem",
        type: "confirm",
        message: "Would you like to place another order?"
    }]).then(function (answer) {
        //if yes, back to start
        console.log(answer.addItem);
        if (answer.addItem) {
            showTable();
        } else {
            console.log("Thank you!")
        }
    })
};