
class Drone {
    constructor(batteryCapacity, powerConsumption) {
        this.batteryCapacity = batteryCapacity;
        this.powerConsumption = powerConsumption;
        this.currentBattery = batteryCapacity;
        this.currentLoad = 0;
    }

    carryLoad(weight) {
        this.currentLoad += weight;
    }

    calculateConsumption(distance) {
        const consumption = this.powerConsumption * (this.currentLoad / 1000) * distance;
        return consumption;
    }

    updateBattery(distance) {
        const consumption = this.calculateConsumption(distance);
        this.currentBattery -= consumption;
        if (this.currentBattery < 0) {
            this.currentBattery = 0;
        }
    }

    recharge() {
        // Simulate drone recharge at a charging station
        this.currentBattery = this.batteryCapacity;
    }
}
module.exports = Drone;