let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("Connected as id" + connection.threadId + "/n");
    displayChoices();
});

function displayChoices() {
    let query = connection.query(
        "SELECT item_id, product_name, price FROM products;",

        function (err, res) {
            if (err) return console.log(err);

            console.log("Have a look-see:");
            console.log(res);
            console.log(query.sql);
            // askAboutPurchase(res);

            //console.log(query);  <--question on this              ??????????????


            const arr = [];
            for (let i = 0; i < res.length; i++) {
                // console.log(res.item_id[i]);
                arr[i] = { name: res[i].product_name, value: res[i].item_id, short: res[i].product_name };
            }
            // }
            console.log(arr)
            inquirer.prompt(
                [
                    {
                        type: "list",
                        message: "What's the ID of the product you'd like to purchase?",
                        choices: arr,
                        name: "idNumber"
                    },
                    {
                        message: "How many would you like to purchase?",
                        type: "input",
                        name: "numberOfItems"
                    }

                ]
            ).then(function (inquirerResponse) {
                let response = inquirerResponse.idNumber;
                console.log("You chose ID " + response);
                console.log(inquirerResponse.numberOfItems);
                let query2 = connection.query(
                    "SELECT stock_quantity FROM products WHERE ?",
                    {
                        item_id: inquirerResponse.idNumber
                    },

                    function (err, res) {
                        if (err) return console.log(err);
                        if (parseInt(inquirerResponse.numberOfItems) > res[0].stock_quantity) {
                            console.log("Too much! Please order fewer of this item.");
                        }
                        else {
                            console.log("Thank you for your purchase! The product is on its way to you.")
                        }
                        console.log(res);

                        connection.end();
                    }
                )
            })
        })
}