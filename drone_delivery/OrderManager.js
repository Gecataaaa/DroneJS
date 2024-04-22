
class OrderManager {
    constructor(config) {
        this.orders = [];
        this.statusUpdateInterval = config.statusUpdateInterval || 5; // Default interval in minutes
    }

    addOrder(order) {
        this.orders.push(order);
    }

    // Method to output order statuses at specified intervals
    outputOrderStatuses() {
        setInterval(() => {
            this.orders.forEach((order, index) => {
                // For demonstration, let's randomly update the status of each order
                const randomStatus = Math.random() < 0.5 ? "Delivered" : "To be delivered";
                order.status = randomStatus;

                // Output the status of the current order
                console.log(`Order ${index + 1} Status:`, order.status);
            });
        }, this.statusUpdateInterval * 60000);
    }

    // Method to mark orders as "Currently in delivery"
    markOrdersInDelivery() {
        // Simulate orders being processed
        this.orders.forEach((order, index) => {
            order.status = "Currently in delivery";
            console.log(`Order ${index + 1} Status:`, order.status);
        });
    }
}

module.exports = OrderManager;
