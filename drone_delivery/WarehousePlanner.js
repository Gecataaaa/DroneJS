class WarehousePlanner {
    constructor() {}

    findOptimalWarehouseLocations(customers, numWarehouses) {
       
        let totalX = 0;
        let totalY = 0;

        // Calculate the total x and y coordinates
        customers.forEach(customer => {
            totalX += customer.x;
            totalY += customer.y;
        });

        // Calculate the centroid
        const centroidX = totalX / customers.length;
        const centroidY = totalY / customers.length;

        // Create 'numWarehouses' warehouses around the centroid
        const optimalLocations = [];
        for (let i = 0; i < numWarehouses; i++) {
            
            const randomX = centroidX + Math.random() * 10 - 5; // Random number between -5 and 5
            const randomY = centroidY + Math.random() * 10 - 5; // Random number between -5 and 5
            optimalLocations.push({ x: randomX, y: randomY });
        }

        return optimalLocations;
    }
}

module.exports = WarehousePlanner;
