// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		crabs = parseInput(data),
		fuel = alignCrabs(crabs);

	return fuel;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "07");

// Functions
function parseInput(data: string) {
	return data.split(",").map(Number);
}
function alignCrabs(crabs: number[]) {
	let minimumFuel = Infinity;

	for (let i = 0; i < Math.max(...crabs); i++) {
		let fuel = 0;

		for (let crab of crabs) {
			fuel += Math.abs(i - crab);
		}

		minimumFuel = Math.min(minimumFuel, fuel);
	}

	return minimumFuel;
}
