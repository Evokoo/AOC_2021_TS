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
	const data = TOOLS.readData(fileName, day),
		scan = parseInput(data),
		count = depthIncreases(scan, true);

	return count;
}

//Run
solveB("example_b", "01");

// Functions
function parseInput(data: string) {
	return data.split("\r\n").map(Number);
}
function depthIncreases(scan: number[], partB: boolean = false) {
	let currentDepth = Infinity;
	let increases = 0;

	for (let i = 0; i < scan.length; i++) {
		const [a, b, c] = [scan[i], scan[i + 1] ?? 0, scan[i + 2] ?? 0];
		const depth = partB ? a + b + c : a;

		if (depth > currentDepth) {
			increases++;
		}

		currentDepth = depth;
	}

	return increases;
}
