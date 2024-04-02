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
	const data = TOOLS.readData(fileName, day),
		range = parseInput(data),
		trajectory = getTrajectory(range);

	return trajectory.options;
}

//Run
solveB("example_b", "17");

// Functions
type Point = { x: number; y: number };
type Trajectory = Point & { maxY: number; options: number };
type Range = [number, number, number, number];

function parseInput(data: string): Range {
	return (data.match(/-*\d+/g) || []).map(Number) as Range;
}
function inRange(point: Point, [x1, x2, y1, y2]: Range) {
	return point.x >= x1 && point.x <= x2 && point.y >= y1 && point.y <= y2;
}
function onTarget(
	probe: Point,
	velocity: Point,
	range: Range
): [boolean, number] {
	let maxY = probe.y;

	while (probe.x <= range[1] && probe.y >= range[2]) {
		probe.x += velocity.x;
		probe.y += velocity.y;

		maxY = Math.max(probe.y, maxY);

		velocity.y--;
		if (velocity.x !== 0) {
			velocity.x > 0 ? velocity.x-- : velocity.x++;
		}

		if (inRange(probe, range)) {
			return [true, maxY];
		}
	}

	return [false, 0];
}
function getTrajectory(range: Range) {
	const trajectory: Trajectory = { x: 0, y: 0, maxY: 0, options: 0 };

	for (let x = -200; x < 200; x++) {
		for (let y = -200; y < 200; y++) {
			const [success, maxY] = onTarget({ x: 0, y: 0 }, { x, y }, range);

			if (success) {
				trajectory.options++;
			}

			if (success && maxY > trajectory.maxY) {
				trajectory.x = x;
				trajectory.y = y;
				trajectory.maxY = maxY;
			}
		}
	}

	return trajectory;
}
