const inquirer = require("inquirer");
const chalk = require("chalk");
const mysql = require("mysql");
require("dotenv").config();
const mysqlPassword = process.env.mysql_password;

// table-cli plug-in
const Table = require('cli-table');
const table = new Table({
    head: [chalk.green('Item ID'), chalk.green('Product Name'), chalk.green('Price')]
  , colWidths: [10, 30, 10]
});

// global tax variable 
const tax = 1.0825;

// global number of items for user validation
let itemTotal = 0;

// connect to database bamazon
// create a connection 
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: mysqlPassword,
    database: "bamazon"
});

connection.connect(error => {
    if (error) throw error;

    renderTableAndQuestions();
});

// render all products when run app
// need to select all from Table 
// format, style, and display the info 
function renderTableAndQuestions() {
    connection.query(
        "SELECT * FROM products",
        (error, response) => {
            if (error) throw error;

            itemTotal = response.length;

            // response is an array of objects
            // for each element need to display keys relevant to customer
            // item_id, product_name, and price
            response.forEach(element => {
                table.push([element.item_id, element.product_name, element.price]);
            });
            userMessageAndQuestions(table.toString())
        }
    )
}

// function that alerts the user and asks them questions again 
function userMessageAndQuestions(message) {
    console.log(`\n${(message)}\n`);
    customerPurchaseQuestions();
}

// ask customer two questions at load 
// what product they would like to buy - need to input a number 
// how much they would like to buy - need to input a number 
function customerPurchaseQuestions() {
    inquirer.prompt([
        {
            name: "userId",
            message: "What product would you like to buy? (please input item ID #)",
        }, 

        {
            name: "userQuantity",
            message: "How much would you like to buy? (please input a number)"
        }
    ])
    .then(answer => {
        // need to validate user input
        // if input NaN for either question need to ask them again
        // if id number greater than total number of items in store, ask again
        if (!parseInt(answer.userId) || !parseInt(answer.userQuantity)) {
            userMessageAndQuestions(chalk.yellow("Please input a number"));
        } else if (answer.userId > itemTotal) {
            userMessageAndQuestions(chalk.yellow("Please input valid item number"));
        } else {
            // check database quantity to see if user can purchase desired amount
            checkDatabaseQuantity(answer.userId, answer.userQuantity);
        }
        
    })
    .catch(error => {
        console.log(error);
    })
}

// grab info from database column by product id 
// if not enough quantity, alert the customer and prompt them again
// else, update the database and show the customer total cost of purchase
// check price info and multiply by userQuantity - display
function checkDatabaseQuantity(itemId, userAmount) {
    connection.query(
        "SELECT * FROM products WHERE ?",
        {
            item_id: itemId
        },
        function(error, response) {
            if (error) throw error;

            const databaseQuantity = response[0].stock_quantity;
            const databaseProductSales = response[0].product_sales;
            const itemPrice = response[0].price;

            if (userAmount > databaseQuantity) {
                userMessageAndQuestions(chalk.yellow("Insufficient quantity. Please purchase less of that product"));
            } else {
                console.log("\nThanks for purchasing " + chalk.yellow(userAmount) + " " + response[0].product_name + "!" + " Here's your receipt...\n");
                const totalPrice = (itemPrice * userAmount * tax).toFixed(2);
                const addToProductSales = parseFloat((itemPrice * userAmount).toFixed(2));
                console.log("Total: " + chalk.green("$" + totalPrice));
                console.log("");
                
                const newDatabaseQuantity = databaseQuantity - userAmount;
                const newDatabaseProductSales = databaseProductSales + addToProductSales;
                connection.query(`
                    UPDATE products 
                    SET stock_quantity = ?, product_sales = ? 
                    WHERE item_id = ?
                    `,
                    [
                        newDatabaseQuantity,
                        newDatabaseProductSales,
                        itemId   
                    ],
                    function(error, response) {
                        if (error) console.log(error);

                        inquirer.prompt([{
                            name: "keepShopping",
                            message: "Do you want to continue shopping?",
                            type: "confirm"
                        }]).then(answer => {
                            if (answer.keepShopping) {
                                // console.log(table.toString());
                                // customerPurchaseQuestions();  
                                userMessageAndQuestions(table.toString());
                            } else {
                                connection.end();
                                process.exit();
                            }
                        }).catch(error => {
                            if (error) {
                                console.log(error.message);
                            }
                        })
                    }
                    );
            }
        }
    );
}