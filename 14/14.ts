// Imports
import TOOLS from "../00/tools";
import { LinkedList } from "./LinkedList";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ polymer, polymerLookup } = parseInput(data),
		score = updatePolymerII(polymer, polymerLookup, 10);

	return score;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ polymer, polymerLookup } = parseInput(data),
		score = updatePolymerII(polymer, polymerLookup, 40);

	return score;
}

//Run
solveB("example_b", "14");

// Functions
type Lookup = Map<string, string>;

function parseInput(data: string) {
	const [polymer, polymerPairs] = data.split(/\r\n\s*\r\n/);

	const polymerLookup: Lookup = new Map();

	for (let pair of polymerPairs.split("\r\n")) {
		const [a, b] = pair.split(" -> ");
		polymerLookup.set(a, b);
	}

	return { polymer, polymerLookup };
}
//Linked list solution, works for part A however not efficent enough for part B
function updatePolymer(polymer: string, polymerLookup: Lookup, steps: number) {
	//Init Linked List
	const polymerList: LinkedList<string> = new LinkedList<string>();
	[...polymer].forEach((char) => polymerList.append(char));

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
//DP soltuion works for both part A & B
function updatePolymerII(
	polymer: string,
	polymerLookup: Lookup,
	steps: number
) {
	const frequency: Map<string, number> = new Map();
	let pairs: Map<string, number> = new Map();

	for (let i = 0; i < polymer.length; i++) {
		const pair = polymer[i] + polymer[i + 1];

		frequency.set(pair[0], (frequency.get(pair[0]) ?? 0) + 1);

		if (pair.length !== 2) continue;
		else pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
	}

	for (let step = 0; step < steps; step++) {
		const newPairs: Map<string, number> = new Map();

		for (let [pair, count] of pairs) {
			const [a, c] = pair;
			const b = polymerLookup.get(a + c)!;

			frequency.set(b, (frequency.get(b) ?? 0) + 1 * count);
			newPairs.set(a + b, (newPairs.get(a + b) ?? 0) + 1 * count);
			newPairs.set(b + c, (newPairs.get(b + c) ?? 0) + 1 * count);
		}

		pairs = newPairs;
	}

	const polymerFrequency: number[] = [...frequency].map(([_, count]) => count);

	return Math.max(...polymerFrequency) - Math.min(...polymerFrequency);
}
