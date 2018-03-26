const http = require("http");
const storage = require("./storage").storage;

http.createServer(function (req, res) {
    // log request object
    console.log("\nIncoming request: " + req.method + " " + req.url);

    console.log("customers in storage:");
    console.log(storage.customers);
    console.log();

    // initialize the body to get the data asynchronously
    req.body = "";

    // get the data of the body
    req.on('data', function (chunk) {
        req.body += chunk;
        console.log("adding data");
    });

    // all data have been received
    req.on('end', function () {
        if (req.method === "GET") {
            processGetRequest(req, res);
        } else {
            res.writeHead(405);
            console.log("method not allowed");
            res.end('bad request');
        }
    });

    function processGetRequest(req, res) {
        let subQuery = req.url.match("^/customer/(\\d+)?$");
        let id = parseInt(subQuery[1]);

        if (!isNaN(id)) {
            let i = storage.getCustomerIndex(id);
            if (i === null) {
                console.log("customer with id " + id + " not found");
                res.writeHead(404);
                res.end();
            } else {
                let customer = storage.customers[i];
                console.log("returning customer: " + JSON.stringify(customer));
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(customer));
            }
        } else {
            console.log("bad request");
            res.writeHead(400);
        }
    }
}).listen(8080);
