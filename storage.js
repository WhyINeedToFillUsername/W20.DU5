const crypto = require('crypto');

exports.storage = {

    customers: [
        {id: 1, name: "Harry Potter", "orders": [1, 2, 3]},
        {id: 2, name: "J. K. Rowling", "orders": [4, 5]},
        {id: 3, name: "Petr Olšák", "orders": [6, 7]},
        {id: 4, name: "Borec Vráťa", "orders": [8]},
        {id: 5, name: "Tonda Karola", "orders": [9]}
    ],

    getCustomerIndex: function (id) {
        for (let i = 0; i < this.customers.length; i++)
            if (this.customers[i].id === id) return i;
        return null;
    },

    customersHash: null,

    getCustomersHash: function () {
        if (!this.customersHash) {
            this.customersHash = getHash(this.customers);
        }
        return this.customersHash;
    },

    lastModified: null,

    getLastModified: function () {
        if (!this.lastModified) {
            this.lastModified = new Date();
        }
        return this.lastModified;
    }
};

function getHash(obj) {
    return crypto.createHash('md5')
        .update(JSON.stringify(obj), 'utf-8')
        .digest('hex');
}