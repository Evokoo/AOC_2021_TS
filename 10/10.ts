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
	const data = TOOLS.readData(fileName, day),
		lines = parseInput(data),
		{ validLines } = validateLines(lines),
		score = completeLines(validLines);

	return score;
}

//Run
solveB("example_b", "10");

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
	let validLines: string[] = [];

	for (let line of lines) {
		while (/\(\)|\[\]|\{\}|<>/.test(line)) {
			line = line.replace(/\(\)|\[\]|\{\}|<>/, "");
		}

		const mismatch = (line.match(/[\[\(\{\<][\)\}\]\>]/) || [])[0];

		if (!mismatch) validLines.push(line);
		else score += value[mismatch[1]];
	}

	return { validLines, score };
}
function completeLines(lines: string[]) {
	const scores: number[] = [];

	for (let line of lines) {
		let lineScore = 0;

		for (let i = line.length - 1; i >= 0; i--) {
			lineScore *= 5;

			switch (line[i]) {
				case "(":
					lineScore += 1;
					break;
				case "[":
					lineScore += 2;
					break;
				case "{":
					lineScore += 3;
					break;
				case "<":
					lineScore += 4;
					break;
				default:
					throw Error("Invalid character");
			}
		}

		scores.push(lineScore);
	}

	return scores.sort((a, b) => a - b)[~~(scores.length / 2)];
}
