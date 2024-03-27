// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		entries = parseInput(data),
		count = countDigits(entries);

	return count;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "08");

// Functions
type Entry = Record<string, string[]>;

function parseInput(data: string) {
	const entries: Entry[] = [];

	for (let entry of data.split("\r\n")) {
		const [signal, output] = entry
			.split(" | ")
			.map((section) => section.split(" "));
		entries.push({ signal, output });
	}

	return entries;
}
function countDigits(entries: Entry[]) {
	let count = 0;

	for (const { output } of entries) {
		for (let combination of output) {
			if ([2, 3, 4, 7].includes(combination.length)) count++;
		}
	}

	return count;
}
