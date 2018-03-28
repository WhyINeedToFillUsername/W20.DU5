const http = require("http");
const storage = require("./storage").storage;
const crypto = require('crypto');

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
        if (req.url.match("^/customers$")) {
            const customersJSON = JSON.stringify(storage.customers);
            const hash = getHash(customersJSON);
                console.log("returning list of customers; hash: " + hash);
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'private, no-store, max-age=200',
                    'ETag': hash
                });
                res.end(customersJSON);
        } else {
            console.log("bad request");
            res.writeHead(400);
            res.end('bad request');
        }
    }
}).listen(8080);

function getHash(str) {
    return crypto.createHash('md5')
        .update(str, 'utf-8')
        .digest('hex');
}
