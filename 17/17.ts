// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		range = parseInput(data),
		trajectory = getTrajectory(range);

	return trajectory.maxY;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "17");

// Functions
type Point = { x: number; y: number };
type Trajectory = Point & { maxY: number };
type Range = [number, number, number, number];

function parseInput(data: string): Range {
	return (data.match(/-*\d+/g) || []).map(Number) as Range;
}
function inRange(point: Point, [x1, x2, y1, y2]: Range, axis?: string) {
	if (axis === "Y") {
		return point.y >= y1 && point.y <= y2;
	}
	if (axis === "X") {
		return point.x >= x1 && point.x <= x2;
	}

	return point.x >= x1 && point.x <= x2 && point.y >= y1 && point.y <= y2;
}
function onTarget(
	probe: Point,
	velocity: Point,
	[x1, x2, y1, y2]: Range
): [boolean, number] {
	let maxY = probe.y;

	while (probe.x < x2 && probe.y > y2) {
		probe.x += velocity.x;
		probe.y += velocity.y;

		maxY = Math.max(probe.y, maxY);

		velocity.y--;
		if (velocity.x !== 0) {
			velocity.x > 0 ? velocity.x-- : velocity.x++;
		}

		if (inRange(probe, [x1, x2, y1, y2])) {
			return [true, maxY];
		}
	}

	return [false, 0];
}

function getTrajectory(range: Range) {
	const trajectory: Trajectory = { x: 0, y: 0, maxY: 0 };

	for (let x = 0; x < 1000; x++) {
		for (let y = 0; y < 1000; y++) {
			const [success, maxY] = onTarget({ x: 0, y: 0 }, { x, y }, range);

			if (success && maxY > trajectory.maxY) {
				trajectory.x = x;
				trajectory.y = y;
				trajectory.maxY = maxY;
			}
		}
	}

	return trajectory;
}
