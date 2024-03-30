// Imports
import TOOLS from "../00/tools";
import { LinkedList } from "./LinkedList";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ polymerList, polymerLookup } = parseInput(data),
		score = updatePolymer(polymerList, polymerLookup, 10);

	return score;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "14");

// Functions
type Lookup = Map<string, string>;

function parseInput(data: string) {
	const [polymer, polymerPairs] = data.split(/\r\n\s*\r\n/);
	const polymerList: LinkedList<string> = new LinkedList<string>();
	const polymerLookup: Lookup = new Map();

	for (let char of polymer) {
		polymerList.append(char);
	}

	for (let pair of polymerPairs.split("\r\n")) {
		const [a, b] = pair.split(" -> ");
		polymerLookup.set(a, b);
	}

	return { polymerList, polymerLookup };
}
function updatePolymer(
	polymerList: LinkedList<string>,
	polymerLookup: Lookup,
	steps: number
) {
	for (let step = 0; step < steps; step++) {
		let current = polymerList.head!;

		while (current !== null) {
			if (current.next === null) break;

			const key = current.data + current.next.data;

			polymerList.insert(current, polymerLookup.get(key)!);
			current = current.next.next!;
		}
	}

	const polymerFrequency: number[] = [];

	for (let [_, frequency] of polymerList.itemFrequency) {
		polymerFrequency.push(frequency);
	}

	return Math.max(...polymerFrequency) - Math.min(...polymerFrequency);
}
