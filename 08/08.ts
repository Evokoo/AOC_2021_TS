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
solveA("example_a", "08");

// Functions
const numberSegments = {
	2: [1],
	3: [7],
	4: [4],
	5: [2, 3, 5],
	6: [6, 9],
	7: [8],
};

function parseInput(data: string) {
	const entries: Record<string, string[]>[] = [];

	for (let entry of data.split("\r\n")) {
		const [signal, output] = entry
			.split(" | ")
			.map((section) => section.split(" "));
		entries.push({ signal, output });
	}

	console.log(entries);
}
