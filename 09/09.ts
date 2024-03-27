// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = parseInput(data),
		{ riskLevel } = findLowPoints(grid);

	return riskLevel;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = parseInput(data),
		{ lowPoints } = findLowPoints(grid),
		basinSize = measureBasins(grid, lowPoints);

	return basinSize;
}

//Run
solveB("example_b", "09");

// Functions
type Point = { x: number; y: number };

function parseInput(data: string) {
	return data.split("\r\n").map((row) => [...row].map(Number));
}
function findLowPoints(grid: number[][]) {
	const width = grid[0].length;
	const height = grid.length;

	const lowPoints: Point[] = [];
	let riskLevel = 0;

	function isLowPoint(point: Point) {
		const currentHeight = grid[point.y][point.x];

		for (let [nx, ny] of [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		]) {
			const [x, y] = [point.x + nx, point.y + ny];

			if (x < 0 || y < 0 || x >= width || y >= height) {
				continue;
			}

			if (currentHeight >= grid[y][x]) {
				return false;
			}
		}

		return true;
	}

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (isLowPoint({ x, y })) {
				lowPoints.push({ x, y });
				riskLevel += grid[y][x] + 1;
			}
		}
	}

	return { lowPoints, riskLevel };
}
function measureBasins(grid: number[][], lowPoints: Point[]) {
	const width = grid[0].length;
	const height = grid.length;

	const seen: Set<string> = new Set();
	const basins: number[] = [];

	for (let point of lowPoints) {
		const queue: Point[] = [point];
		let basinSize = 0;

		while (queue.length) {
			const current = queue.shift()!;
			const coord = `${current.x},${current.y}`;

			if (seen.has(coord)) {
				continue;
			} else {
				seen.add(coord);
				basinSize++;
			}

			for (let [nx, ny] of [
				[0, 1],
				[0, -1],
				[1, 0],
				[-1, 0],
			]) {
				const [x, y] = [nx + current.x, ny + current.y];

				if (x < 0 || y < 0 || x >= width || y >= height || grid[y][x] === 9) {
					continue;
				} else {
					queue.push({ x, y });
				}
			}
		}

		basins.push(basinSize);
	}

	return basins
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((acc, cur) => acc * cur, 1);
}
