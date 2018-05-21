var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
    order();
});

// function which displays all of the items available for sale
var start = function () {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ' | ' + res[i].product_name + ' | ', res[i].price);
        }
    });
}

var order = function () {

    // query the database for all items being auctioned
    connection.query('SELECT * FROM products', function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: 'Please select the item you want to purchase'
                },
                {
                    name: 'quantity',
                    type: 'input',
                    message: 'How many units would you like to buy?'
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                // determine if the database basebase has enough quantity. (GreatBay 10)
                if (parseInt(chosenItem.stock_quantity) > answer.quantity) {
                    //New quantity amount so it can be displayed
                    newqty = (parseInt(chosenItem.stock_quantity) - answer.quantity);
                    // update db
                    connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity: (parseInt(chosenItem.stock_quantity) - answer.quantity)
                            },
                            {
                                item_id: chosenItem.id
                            }
                        ],
                    );
                    console.log('Order in!')
                    //updateInventory();
                    //show it below

                }
                else {
                    // Not enough quantity in db
                    console.log('Insufficient quantity!');
                }
            });
    });
}

function updateInventory() {
    //console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: (parseInt(chosenItem.stock_quantity) - answer.quantity)
        },
        {
            item_id: chosenItem.id
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        //deleteProduct();
      }
    );
}
