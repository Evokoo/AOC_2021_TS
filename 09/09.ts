// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = parseInput(data);

	return getRiskLevel(grid);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "09");

// Functions
type Point = { x: number; y: number };

function parseInput(data: string) {
	return data.split("\r\n").map((row) => [...row].map(Number));
}
function getRiskLevel(grid: number[][]) {
	const width = grid[0].length;
	const height = grid.length;

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
				console.log({ x, y, value: grid[y][x] });
				riskLevel += grid[y][x] + 1;
			}
		}
	}

	return riskLevel;
}
