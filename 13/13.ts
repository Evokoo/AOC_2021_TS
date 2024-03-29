// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ points, folds } = parseInput(data),
		visiblePoints = makeFolds(folds.slice(0, 1), points);

	return visiblePoints.size;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "13");

// Functions
type Point = { x: number; y: number };
type Fold = { axis: string; index: number };

function parseInput(data: string) {
	const points: Set<string> = new Set();
	const folds: Fold[] = [];
	const sections = data.split(/\r\n\s*\r\n/);

	for (let line of sections[0].split("\r\n")) {
		const [x, y] = line.split(",").map(Number);
		points.add(`${x},${y}`);
	}

	for (let line of sections[1].split("\r\n")) {
		const [axis, index] = line.split(" ")[2].split("=");
		folds.push({ axis, index: +index });
	}

	return { points, folds };
}
function makeFolds(folds: Fold[], points: Set<string>) {
	for (let { axis, index } of folds) {
		const newPoints: Set<string> = new Set();

		for (let point of points) {
			const [x, y] = point.split(",").map(Number);

			if (axis === "y") {
				if (y < index) continue;
				points.delete(point);
				newPoints.add(`${x},${index - (y - index)}`);
			}

			if (axis === "x") {
				if (x > index) continue;
				points.delete(point);
				newPoints.add(`${index + (index - x)},${y}`);
			}
		}

		points = new Set([...points, ...newPoints]);
	}

	return points;
}

type Range = { min: number; max: number };

function drawGrid(points: Set<string>): void {
	const toPlot: Point[] = [];
	const xRange: Range = { min: Infinity, max: -Infinity };
	const yRange: Range = { min: Infinity, max: -Infinity };

	for (let point of points) {
		const [x, y] = point.split(",").map(Number);
		toPlot.push({ x, y });

		xRange.min = Math.min(x, xRange.min);
		xRange.max = Math.max(x, xRange.max);
		yRange.min = Math.min(y, yRange.min);
		yRange.max = Math.max(y, yRange.max);
	}

	const grid = Array.from({ length: yRange.max - yRange.min + 1 }, () =>
		Array.from({ length: xRange.max - xRange.min + 1 }, () => ".")
	);

	for (let { x, y } of toPlot) {
		grid[y - yRange.min][x - xRange.min] = "#";
	}

	const img = grid.map((row) => row.join("")).join("\n");

	console.log(img);
}
