// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		binaryNumbers = parseInput(data),
		powerConsumption = getPowerConsumption(binaryNumbers);

	return powerConsumption;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		binaryNumbers = parseInput(data),
		lifeSupportRating = getLifeSupportRating(binaryNumbers);

	return lifeSupportRating;
}

//Run
solveB("example_b", "03");

// Functions
function parseInput(data: string) {
	return data.split("\r\n").map((bin) => [...bin].map(Number));
}
function analyseBits(binaryNumbers: number[][]) {
	const mostCommon: number[] = Array(binaryNumbers[0].length).fill(0);
	const leastCommon: number[] = Array(binaryNumbers[0].length).fill(0);

	for (let x = 0; x < binaryNumbers[0].length; x++) {
		let score: Record<string, number> = { "0": 0, "1": 0 };

		for (let y = 0; y < binaryNumbers.length; y++) {
			score[String(binaryNumbers[y][x])]++;
		}

		if (score["0"] > score["1"]) {
			mostCommon[x] = 0;
			leastCommon[x] = 1;
		} else if (score["0"] < score["1"]) {
			mostCommon[x] = 1;
			leastCommon[x] = 0;
		} else {
			mostCommon[x] = 1;
			leastCommon[x] = 0;
		}
	}

	return [mostCommon, leastCommon];
}
function getPowerConsumption(binaryNumbers: number[][]) {
	const [mostCommon, leastCommon] = analyseBits(binaryNumbers);
	const gammaRate = parseInt(mostCommon.join(""), 2);
	const epsilonRate = parseInt(leastCommon.join(""), 2);

	return gammaRate * epsilonRate;
}
function getLifeSupportRating(binaryNumbers: number[][]) {
	let O2 = binaryNumbers;
	let CO2 = binaryNumbers;

	for (let i = 0; i < binaryNumbers[0].length; i++) {
		const [mostCommon, _] = analyseBits(O2);

		if (O2.length === 1) {
			break;
		} else {
			O2 = O2.filter((num) => num[i] === mostCommon[i]);
		}
	}

	for (let i = 0; i < binaryNumbers[0].length; i++) {
		const [_, leastCommon] = analyseBits(CO2);

		if (CO2.length === 1) {
			break;
		} else {
			CO2 = CO2.filter((num) => num[i] === leastCommon[i]);
		}
	}

	const O2Rate = parseInt(O2[0].join(""), 2);
	const CO2Rate = parseInt(CO2[0].join(""), 2);

	return O2Rate * CO2Rate;
}
