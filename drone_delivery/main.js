//Import classes
const Warehouse = require('./Warehouse');
const Customer = require('./Customer');
const Drone = require('./Drone');
const DeliveryRoute = require('./DeliveryRoute');
const RoutePlanner = require('./RoutePlanner');
const DeliveryTimeEstimator = require('./DeliveryTimeEstimator');
const WarehousePlanner = require('./WarehousePlanner');
const Order = require('./Order');
const OrderManager = require('./OrderManager');
const ChargingStation = require('./ChargingStation');
const fs = require('fs');

//Json data
const warehousesData = JSON.parse(fs.readFileSync('./warehouses.json', 'utf8'));
const customersData = JSON.parse(fs.readFileSync('./customers.json', 'utf8'));
const dronesData = JSON.parse(fs.readFileSync('./drones.json', 'utf8'));
const ordersData = JSON.parse(fs.readFileSync('./orders.json', 'utf8'));
const chargingStationsData = JSON.parse(fs.readFileSync('./chargingStations.json', 'utf8'));

// Json instances
const warehousesFromFile = warehousesData.map(data => new Warehouse(data.x, data.y));
const customers = customersData.map(data => new Customer(data.x, data.y));
const drones = dronesData.map(data => new Drone(data.batteryCapacity, data.powerConsumption));
const orders = ordersData.map(data => new Order(data.warehouse, data.customer));
const chargingStations = chargingStationsData.map(data => new ChargingStation(data.location, data.type));

// Use WarehousePlanner to find optimal warehouse locations
const warehousePlanner = new WarehousePlanner();
const numWarehouses = 3;
const optimalWarehouseLocations = warehousePlanner.findOptimalWarehouseLocations(customers, numWarehouses);


// Print
console.log("Customers:", customers);
console.log("Warehouses:", warehousesFromFile);
console.log("Drones:", drones);
console.log("Orders:", orders);
console.log("Optimal Warehouse Locations:", optimalWarehouseLocations);

// Simulate drone operations
function simulateDroneOperations() {
    // Simulate carrying load and updating battery
    drones.forEach((drone, index) => {
        const distance = 10;
        const weight = 2;
        drone.carryLoad(weight);
        drone.updateBattery(distance);
        console.log(`Drone ${index + 1}: Carrying load of ${weight} units and updating battery. Remaining battery: ${drone.currentBattery}/${drone.batteryCapacity}`);
    });

    // Simulate drone recharging
    setTimeout(() => {
        drones.forEach((drone, index) => {
            drone.recharge();
            console.log(`Drone ${index + 1}: Recharging. Battery fully charged: ${drone.currentBattery}/${drone.batteryCapacity}`);
        });
    }, 10000); // Simulate charging after 10 sec
}

simulateDroneOperations();

// Example delivery route with waypoints
const waypoints = [...warehousesFromFile, ...customers];

// Creating delivery route
const deliveryRoute = new DeliveryRoute(waypoints);

// Optimizing delivery route
const routePlanner = new RoutePlanner();
const optimizedRoute = routePlanner.optimizeRoute(deliveryRoute);

// Estimating delivery time
const deliveryTimeEstimator = new DeliveryTimeEstimator();
const droneSpeed = 1; // Assume drone speed is 1 unit/min
const estimatedTime = deliveryTimeEstimator.estimateDeliveryTime(optimizedRoute, droneSpeed);

// Calculate total time needed to deliver all orders
const totalDeliveryTime = estimatedTime;
console.log("Total Delivery Time:", totalDeliveryTime);

// Calculate the number of drones used
const numberOfDronesUsed = drones.length;
console.log("Number of Drones Used:", numberOfDronesUsed);

// Calculate average time for delivering a single order
const averageDeliveryTime = totalDeliveryTime / orders.length;
console.log("Average Delivery Time per Order:", averageDeliveryTime);

// real-time program execution and output configuration
const config = {
    statusUpdateInterval: 0.025 // updating every 0.025 min
};
// Initialize OrderManager with config
const orderManager = new OrderManager(config);

// Implement functionality to add new orders during program execution
const newOrders = [
    { warehouse: { x: 40, y: 35 }, customer: { x: 45, y: 40 } },
    { warehouse: { x: 70, y: 65 }, customer: { x: 25, y: 10 } },
    { warehouse: { x: 10, y: 5 }, customer: { x: 50, y: 30 } },

];
newOrders.forEach(orderData => {
    const newOrder = new Order(orderData.warehouse, orderData.customer);
    orderManager.addOrder(newOrder);
});


orderManager.outputOrderStatuses();

// Implement charging stations network functionality (Not fully implemented)
// Allow users to configure charging station locations and types (Not fully implemented)
// Consider charging station types and their impact on drone operations (Not fully implemented)



