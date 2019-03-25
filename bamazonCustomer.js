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
    
        function(err, res) {
            if (err) throw err;
            console.log("Have a look-see:");
            console.log(res);
            askAboutPurchase();
            console.log(query);
        }
    )
    //console.log(query);  <--question on this              ??????????????



    function askAboutPurchase(){
        function loopForIDs(){
            for (i = 0 ; i < res.length; i++){
                console.log(res.item_id[i]);
            }
        }
        inquirer.prompt(
            [
                {
                message: "What's the ID of the product you'd like to purchase?",
                type: "list",
                choices: [loopForIDs()],
                name: "idNumber"
                }
            ]
        ).then(function(inquirerResponse){
            let response = inquirerResponse.idNumber;
            console.log("You chose ID "+ response);
        
    //narrow down res to the item user chose
    
                function unitsOfPurchase(){
                    inquirer.prompt[
                        {
                            message: "How many would you like to purchase?",
                            type: "input",
                            name: "numberOfItems"
                        }
                    ].then(function(inquirerResponse){
                        let response2 = inquirerResponse.numberOfItems;
                        console.log("You chose " + response2);
                        if (parseInt(response2) > res.stock_quantity){
                            console.log("Too much! Please order fewer of this item.");
                            connection.end();
                        }
                        else {
                            console.log("Thank you for your purchase! The product is on its way to you.")
                        }
                    })  
                }
            })
            }
    }

