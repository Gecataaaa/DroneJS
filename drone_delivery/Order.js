// Order.js
class Order {
    constructor(warehouse, customer) {
        this.warehouse = warehouse;
        this.customer = customer;
        this.status = "To be delivered";
    }
}

module.exports = Order;
