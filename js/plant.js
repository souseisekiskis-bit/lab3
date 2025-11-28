export class Plant {
    constructor(name, minMoisture, maxMoisture, color) {
        this.name = name;
        this.minMoisture = minMoisture;
        this.maxMoisture = maxMoisture;
        this.color = color;
        this.growth = 0;
        this.alive = true;
    }

    grow(moisture) {
        if (!this.alive) return;

        if (moisture >= this.minMoisture && moisture <= this.maxMoisture) {
            this.growth++;
        } else {
            this.alive = false;
            this.growth = -1;
        }
    }

    getColor() {
        return this.alive ? this.color : 'gray';
    }
}
