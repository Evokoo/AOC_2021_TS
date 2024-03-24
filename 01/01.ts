// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		scan = parseInput(data),
		count = depthIncreases(scan);

	return count;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "01");

// Functions
function parseInput(data: string) {
	return data.split("\r\n").map(Number);
}
function depthIncreases(scan: number[]) {
	let current = scan.shift()!;
	let increases = 0;

	for (let depth of scan) {
		if (depth > current) {
			increases++;
		}

		current = depth;
	}

	return increases;
}
