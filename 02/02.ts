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
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "02");

// Functions
type Direction = { direction: string; amount: number };
type Submarine = { x: number; y: number };

function parseInput(data: string) {
	const directions: Direction[] = [];

	for (let line of data.split("\r\n")) {
		const [direction, amount] = line.split(" ");
		directions.push({ direction: direction[0], amount: +amount });
	}

	return directions;
}
function navigateSubmarine(directions: Direction[]) {
	const submarine: Submarine = { x: 0, y: 0 };

	for (const { direction, amount } of directions) {
		switch (direction) {
			case "f":
				submarine.x += amount;
				break;
			case "d":
				submarine.y += amount;
				break;
			case "u":
				submarine.y -= amount;
				break;
		}
	}

	return submarine.x * submarine.y;
}
