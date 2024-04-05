// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data, { min: -50, max: 50 }),
		activeLights = runInstructions(instructions);

	return activeLights;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "22");

// Functions
type Range = { min: number; max: number };
type Instruction = { action: string; x: Range; y: Range; z: Range };
type Lights = Map<string, boolean>;

function parseInput(data: string, cubeRange: Range) {
	const instructions: Instruction[] = [];

	for (let line of data.split("\r\n")) {
		const action = line.startsWith("off") ? "off" : "on";
		const [x1, x2, y1, y2, z1, z2] = (line.match(/-*\d+/g) || []).map(Number);

		instructions.push({
			action,
			x: { min: Math.max(x1, cubeRange.min), max: Math.min(x2, cubeRange.max) },
			y: { min: Math.max(y1, cubeRange.min), max: Math.min(y2, cubeRange.max) },
			z: { min: Math.max(z1, cubeRange.min), max: Math.min(z2, cubeRange.max) },
		});
	}

	return instructions;
}
function getPoints(ranges: Instruction) {
	const points: string[] = [];

	for (let x = ranges.x.min; x <= ranges.x.max; x++) {
		for (let y = ranges.y.min; y <= ranges.y.max; y++) {
			for (let z = ranges.z.min; z <= ranges.z.max; z++) {
				points.push(`${x},${y},${z}`);
			}
		}
	}

	return points;
}
function runInstructions(instructions: Instruction[]) {
	const lights: Lights = new Map();

	for (let instruction of instructions) {
		const points = getPoints(instruction);

		for (let point of points) {
			if (instruction.action === "on") {
				lights.set(point, true);
			} else {
				lights.delete(point);
			}
		}
	}

	return lights.size;
}
