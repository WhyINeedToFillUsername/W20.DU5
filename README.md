# W20.DU5
Homework 5 of the W20 class at FIT CTU.

## How to run
This is a node.js server. Simply run by command ``du5-.._ETag.js``.

## Assignment - RESTfull - Conditional GET
Task
Design and implement simple service - get list of customers

Example:

GET /customers
[
    {
        "id": 1,
        "name": "aaa",
        "orders": []
    },
    {
        "id": 2,
        "name": "bbb",
        "orders": []
    }
]
Implement HTTP caching using Last-Modified and ETag. Implement two version of ETag: strong and weak ETag. For weak ETag use only the id and the name from each costumer. Do not forget to show examples of communication including all HTTP Headers.

Use http://nodejs.org and http module.
