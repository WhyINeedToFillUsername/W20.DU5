exports.storage = {

    customers: [
        {id: 1, name: "Harry Potter", "orders": []},
        {id: 2, name: "J. K. Rowling", "orders": []},
        {id: 3, name: "Petr Olšák", "orders": []},
        {id: 4, name: "Borec Vráťa", "orders": []},
        {id: 5, name: "Tonda Karola", "orders": []}
    ],

    getCustomerIndex: function (id) {
        for (let i = 0; i < this.customers.length; i++)
            if (this.customers[i].id === id) return i;
        return null;
    },
};