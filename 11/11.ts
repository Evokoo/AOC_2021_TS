// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = parseInput(data),
		flashes = simulateFlashes(grid, 100);

	return flashes;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "11");

// Functions
type Point = { x: number; y: number };

function parseInput(data: string) {
	return data.split("\r\n").map((row) => [...row].map(Number));
}
function simulateFlashes(grid: number[][], steps: number) {
	const width = grid[0].length;
	const height = grid.length;

	let totalFlashes = 0;

	const flashing: Set<string> = new Set();

	for (let step = 0; step < steps; step++) {
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const coord = `${x},${y}`;

				if (flashing.has(coord)) {
					continue;
				} else {
					if ((grid[y][x] += 1) > 9) {
						flashing.add(coord);
						disperseEnergy({ x, y });
					}
				}
			}
		}

		for (let point of flashing) {
			const [x, y] = point.split(",");
			totalFlashes++;
			grid[+y][+x] = 0;
		}

		flashing.clear();
	}

	function getNeighbours(point: Point) {
		const neighbours: Point[] = [];

		for (let [nx, ny] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
			[1, 1],
			[1, -1],
			[-1, 1],
			[-1, -1],
		]) {
			const [x, y] = [point.x + nx, point.y + ny];

			if (x < 0 || y < 0 || x >= width || y >= height) continue;
			else if (flashing.has(`${x},${y}`)) continue;
			else neighbours.push({ x, y });
		}

		return neighbours;
	}
	function disperseEnergy(point: Point) {
		const queue: Point[] = [point];

		while (queue.length) {
			const current = queue.shift()!;

			for (const { x, y } of getNeighbours(current)) {
				if ((grid[y][x] += 1) > 9) {
					flashing.add(`${x},${y}`);
					queue.push({ x, y });
				}
			}
		}
	}

	return totalFlashes;
}
