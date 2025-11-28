import { Cell } from './cell.js';

export class Grid {
    constructor(size = 10) {
        this.size = size;
        this.cells = Array.from({ length: size * size }, () => new Cell());
    }

    getNeighbors(index) {
        const neighbors = [];
        const x = index % this.size;
        const y = Math.floor(index / this.size);
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < this.size && ny < this.size) {
                    neighbors.push(this.cells[ny * this.size + nx]);
                }
            }
        }
        return neighbors;
    }
}
