import { Grid } from './grid.js';
import { Potato } from './potato.js';
import { Swampweed } from './swampweed.js';
import { Cactus } from './cactus.js';

const gridElement = document.getElementById('grid');
const grid = new Grid(10);

let selectedTool = null;
let selectedSeed = null;

// выбор инструментов
document.getElementById('bucket').addEventListener('click', () => {
    selectedTool = 'bucket';
    selectedSeed = null;
});

document.getElementById('shovel').addEventListener('click', () => {
    selectedTool = 'shovel';
    selectedSeed = null;
});

// выбор семян
document.querySelectorAll('.seed-icon').forEach(seed => {
    seed.addEventListener('click', () => {
        document.querySelectorAll('.seed-icon').forEach(s => s.classList.remove('selected'));
        seed.classList.add('selected');
        selectedSeed = seed.id.replace('seed-', '');
        selectedTool = null;
    });
});

// отрисовка клеток
grid.cells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.className = 'cell';
    cellElement.style.backgroundColor = cell.getColor();

    cellElement.addEventListener('click', () => {
        if (selectedTool === 'bucket') {
            cell.type = 'water';
            renderCell(cellElement, cell);
            return;
        }

        if (selectedTool === 'shovel') {
            cell.plant = null;
            cell.type = 'soil';
            renderCell(cellElement, cell);
            return;
        }

        if (selectedSeed) {
            let plant;
            if (selectedSeed === 'potato') plant = new Potato();
            if (selectedSeed === 'swampweed') plant = new Swampweed();
            if (selectedSeed === 'cactus') plant = new Cactus();
            cell.plant = plant;
            cell.type = 'soil';
            renderCell(cellElement, cell);
        }
    });

    gridElement.appendChild(cellElement);
});

// функция отрисовки
function renderCell(cellElement, cell) {
    cellElement.style.backgroundColor = cell.getColor();
    cellElement.innerHTML = '';

    if (cell.plant) {
        const plantDiv = document.createElement('div');
        plantDiv.className = 'plant-circle';
        plantDiv.style.backgroundColor = cell.plant.getColor();
        cellElement.appendChild(plantDiv);
    }
}

// цикл роста
setInterval(() => {
    grid.cells.forEach((cell, index) => {
        const neighbors = grid.getNeighbors(index);
        cell.updateMoisture(neighbors);
        if (cell.plant) {
            cell.plant.grow(cell.moisture);
        }
        const cellElement = gridElement.children[index];
        renderCell(cellElement, cell);
    });
}, 1000);
