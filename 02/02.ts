// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		result = navigateSubmarine(directions);

	return result;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		result = navigateSubmarine(directions, true);

	return result;
}

//Run
solveB("example_b", "02");

// Functions
type Direction = { direction: string; amount: number };
type Submarine = { x: number; depth: number; aim: number };

function parseInput(data: string) {
	const directions: Direction[] = [];

	for (let line of data.split("\r\n")) {
		const [direction, amount] = line.split(" ");
		directions.push({ direction: direction[0], amount: +amount });
	}

	return directions;
}
function navigateSubmarine(directions: Direction[], partB: boolean = false) {
	const submarine: Submarine = { x: 0, depth: 0, aim: 0 };

	for (const { direction, amount } of directions) {
		if (partB) {
			switch (direction) {
				case "f":
					submarine.x += amount;
					submarine.depth += submarine.aim * amount;
					break;
				case "d":
					submarine.aim += amount;
					break;
				case "u":
					submarine.aim -= amount;
					break;
				default:
					throw Error("Invalid command");
			}
		} else {
			switch (direction) {
				case "f":
					submarine.x += amount;
					break;
				case "d":
					submarine.depth += amount;
					break;
				case "u":
					submarine.depth -= amount;
					break;
				default:
					throw Error("Invalid command");
			}
		}
	}

	return submarine.x * submarine.depth;
}
