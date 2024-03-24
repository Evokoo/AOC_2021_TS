// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		binaryNumbers = parseInput(data),
		result = findPowerConsumption(binaryNumbers);

	console.log(result);

	return result;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "03");

// Functions
function parseInput(data: string) {
	return data.split("\r\n").map((bin) => [...bin].map(Number));
}
function findPowerConsumption(binaryNumbers: number[][]) {
	const gamma: number[] = Array(binaryNumbers[0].length).fill(0);
	const epsilon: number[] = Array(binaryNumbers[0].length).fill(0);
	const threshold = binaryNumbers.length / 2;

	for (let x = 0; x < binaryNumbers[0].length; x++) {
		let score = 0;

		for (let y = 0; y < binaryNumbers.length; y++) {
			score += binaryNumbers[y][x];
		}

		if (score > threshold) {
			gamma[x] = 1;
			epsilon[x] = 0;
		} else {
			gamma[x] = 0;
			epsilon[x] = 1;
		}
	}

	const gammaRate = parseInt(gamma.join(""), 2);
	const epsilonRate = parseInt(epsilon.join(""), 2);

	return gammaRate * epsilonRate;
}
