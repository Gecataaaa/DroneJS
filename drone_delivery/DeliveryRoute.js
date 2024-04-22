class DeliveryRoute {
    constructor(waypoints) {
        this.waypoints = waypoints;
    }

    calculateDistance() {
        // Calculate the total distance of the route
        let totalDistance = 0;
        for (let i = 1; i < this.waypoints.length; i++) {
            const distance = this.calculateDistanceBetweenPoints(this.waypoints[i - 1], this.waypoints[i]);
            totalDistance += distance;
        }
        return totalDistance;
    }

    calculateDistanceBetweenPoints(point1, point2) {
        // Calculate the distance between two points
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
}

module.exports = DeliveryRoute;
