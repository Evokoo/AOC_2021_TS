// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		lines = parseInput(data),
		{ score } = validateLines(lines);

	return score;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "10");

// Functions
function parseInput(data: string) {
	return data.split("\r\n");
}
function validateLines(lines: string[]) {
	const value: Record<string, number> = {
		")": 3,
		"]": 57,
		"}": 1197,
		">": 25137,
	};

	let score: number = 0;
	let valid: string[] = [];

	for (let line of lines) {
		while (/\(\)|\[\]|\{\}|<>/.test(line)) {
			line = line.replace(/\(\)|\[\]|\{\}|<>/, "");
		}

		const mismatch = (line.match(/[\[\(\{\<][\)\}\]\>]/) || [])[0];

		if (!mismatch) valid.push(line);
		else score += value[mismatch[1]];
	}

	return { valid, score };
}
