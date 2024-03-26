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
	const data = TOOLS.readData(fileName, day),
		points = parseInput(data, true),
		intersections = findIntersections(points);

	return intersections;
}

//Run
solveB("example_b", "05");

// Functions
type Points = Map<string, number>;

function parseInput(data: string, diagonal: boolean = false) {
	const points: Points = new Map();

	for (let line of data.split("\r\n")) {
		const [x1, y1, x2, y2] = (line.match(/\d+/g) || []).map(Number);
		const [lx, hx] = [x1, x2].sort((a, b) => a - b);
		const [ly, hy] = [y1, y2].sort((a, b) => a - b);

		if (x1 === x2 || y1 === y2) {
			for (let x = lx; x <= hx; x++) {
				for (let y = ly; y <= hy; y++) {
					const point = `${x},${y}`;
					points.set(point, (points.get(point) ?? 0) + 1);
				}
			}
		} else if (diagonal) {
			const slope = Math.abs((y2 - y1) / (x2 - x1));

			if (slope === 1) {
				const start = { x: x1, y: y1 };
				const end = { x: x2, y: y2 };

				//Set initial point
				points.set(`${x1},${y1}`, (points.get(`${x1},${y1}`) ?? 0) + 1);

				//Increment start until it matches end
				while (start.x !== end.x && start.y !== end.y) {
					if (start.x < end.x) start.x++;
					if (start.x > end.x) start.x--;
					if (start.y < end.y) start.y++;
					if (start.y > end.y) start.y--;

					const point = `${start.x},${start.y}`;
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
