// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "12");

// Functions
type CaveMap = Map<string, Set<string>>;

function parseInput(data: string) {
	const caveMap: CaveMap = new Map();

	for (let line of data.split("\r\n")) {
		const [a, b] = line.split("-");

		caveMap.set(a, (caveMap.get(a) ?? new Set()).add(b));
		caveMap.set(b, (caveMap.get(b) ?? new Set()).add(a));
	}

	console.log(caveMap);
}
