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
	const data = TOOLS.readData(fileName, day),
		entries = parseInput(data),
		output = outputValue(entries);

	return output;
}

//Run
solveB("example_b", "08");

// Functions
type Entry = { signal: string[]; output: string[] };

function parseInput(data: string) {
	const entries: Entry[] = [];

	for (let entry of data.split("\r\n")) {
		const [signal, output] = entry
			.split(" | ")
			.map((section) =>
				section.split(" ").map((str) => [...str].sort().join(""))
			);
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
function identifyDigits(signal: string[]) {
	function containSegments(numA: string, numB: string) {
		const sets = [numA, numB]
			.sort((a, b) => a.length - b.length)
			.map((str) => new Set([...str]));

		for (let segment of sets[0]) {
			if (!sets[1].has(segment)) return false;
		}

		return true;
	}
	function sharedSegments(numA: string, numB: string) {
		let shared = 0;

		for (let segment of numA) {
			if (numB.includes(segment)) shared++;
		}

		return shared;
	}

	const numToString: Map<number, string> = new Map();

	while (numToString.size !== 10) {
		const current = signal.shift()!;
		const segments = current.length;

		switch (segments) {
			case 2:
				numToString.set(1, current);
				break;
			case 3:
				numToString.set(7, current);
				break;
			case 4:
				numToString.set(4, current);
				break;
			case 5:
				if (
					numToString.has(1) &&
					containSegments(current, numToString.get(1)!)
				) {
					numToString.set(3, current);
					break;
				}

				if (numToString.has(6)) {
					const shared = sharedSegments(current, numToString.get(6)!);

					if (shared === 4) {
						numToString.set(2, current);
						break;
					}
					if (shared === 5) {
						numToString.set(5, current);
						break;
					}
				}

				signal.push(current);
				break;
			case 6:
				if (
					numToString.has(4) &&
					containSegments(current, numToString.get(4)!)
				) {
					numToString.set(9, current);
					break;
				}

				if (
					numToString.has(1) &&
					numToString.has(9) &&
					containSegments(current, numToString.get(1)!)
				) {
					numToString.set(0, current);
					break;
				}

				if (numToString.has(0) && numToString.has(9)) {
					numToString.set(6, current);
					break;
				}

				signal.push(current);
				break;
			case 7:
				numToString.set(8, current);
				break;
			default:
				signal.push(current);
				break;
		}
	}

	//Flip key and value
	const stringToNum: Map<string, number> = new Map();

	for (let [string, number] of numToString) {
		stringToNum.set(number, string);
	}

	return stringToNum;
}
function outputValue(entries: Entry[]) {
	let outputTotal = 0;

	for (let { signal, output } of entries) {
		const digits = identifyDigits(signal);
		outputTotal += +output.map((str) => digits.get(str)!).join("");
	}

	return outputTotal;
}
