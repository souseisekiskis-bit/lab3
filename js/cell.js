export class Cell {
    constructor(type = 'soil') {
        this.type = type;   // soil или water
        this.moisture = 0;
        this.plant = null;
    }

    updateMoisture(neighbors) {
        const waterBlocks = neighbors.filter(n => n.type === 'water');
        this.moisture = Math.min(100, waterBlocks.length * 25);
    }

    getColor() {
        if (this.type === 'water') {
            return 'blue'; // вода
        }
        const moisture = this.moisture;
        const r = 255 - moisture * 1.5;
        const g = 200 - moisture;
        const b = 50;
        return `rgb(${r}, ${g}, ${b})`;
    }
}
