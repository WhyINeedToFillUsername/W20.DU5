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
        if (req.method === "GET" && req.url.match("^/customers$")) {
            processGetRequest(req, res);
        } else {
            console.log("bad request");
            res.writeHead(400);
            res.end('bad request');
        }
    });

    function processGetRequest(req, res) {
        const ETag = req.headers['if-none-match'];
        const hash = storage.getCustomersHash();

        if (ETag === hash) {
            console.log("received ETag: " + ETag + ", returning 304 not modified");
            res.writeHead(304, {
                'Cache-Control': 'private, no-store, max-age=200',
                'Last-Modified': storage.getLastModified().toUTCString(),
                'ETag': hash
            });
            res.end();
        } else {
            const customersJSON = JSON.stringify(storage.customers);
            console.log("returning list of customers; hash: " + hash);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Cache-Control': 'private, no-store, max-age=200',
                'Last-Modified': storage.getLastModified().toUTCString(),
                'ETag': hash
            });
            res.end(customersJSON);
        }
    }
}).listen(8080);