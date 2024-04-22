const DeliveryRoute = require('./DeliveryRoute');

class DeliveryTimeEstimator {
    constructor() {}

    estimateDeliveryTime(route, droneSpeed) {
        // Estimate delivery time based on route and drone speed
        const distance = route.calculateDistance();
        let time;
        time = distance / droneSpeed; // Assuming constant drone speed
        return time;
    }
}

module.exports = DeliveryTimeEstimator;
