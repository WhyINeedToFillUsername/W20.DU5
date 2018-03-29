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

    customersStrongEtag: null,

    getCustomersStrongEtag: function () {
        if (!this.customersStrongEtag) {
            this.customersStrongEtag = "\"" + getHash(JSON.stringify(this.customers)) + "\"";
        }
        return this.customersStrongEtag;
    },

    customersWeakEtag: null,

    getCustomersWeakEtag: function () {
        if (!this.customersWeakEtag) {
            this.customersWeakEtag = "W/\"" + computeWeakETag(this.customers) + "\"";
        }
        return this.customersWeakEtag;
    },

    lastModified: null,

    getLastModified: function () {
        if (!this.lastModified) {
            this.lastModified = new Date();
        }
        return this.lastModified;
    }
};

function getHash(str) {
    return crypto.createHash('md5')
        .update(str, 'utf-8')
        .digest('hex');
}

function computeWeakETag(customers) {
    let content = "";
    for (let i = 0; i < customers.length; i++)
        content += customers[i].id + customers[i].name;
    return getHash(content);
}