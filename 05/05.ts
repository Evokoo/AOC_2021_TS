// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		points = parseInput(data),
		intersections = findIntersections(points);

	return intersections;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "05");

// Functions
type Points = Map<string, number>;

function parseInput(data: string) {
	const points: Points = new Map();

	for (let line of data.split("\r\n")) {
		const [x1, y1, x2, y2] = (line.match(/\d+/g) || []).map(Number);

		if (x1 === x2 || y1 === y2) {
			const [lx, hx] = [x1, x2].sort((a, b) => a - b);
			const [ly, hy] = [y1, y2].sort((a, b) => a - b);

			for (let x = lx; x <= hx; x++) {
				for (let y = ly; y <= hy; y++) {
					const point = `${x},${y}`;
					points.set(point, (points.get(point) ?? 0) + 1);
				}
			}
		}
	}

	return points;
}
function findIntersections(points: Points) {
	let intersections = 0;

	for (let [_, count] of points) {
		if (count > 1) intersections++;
	}

	return intersections;
}
