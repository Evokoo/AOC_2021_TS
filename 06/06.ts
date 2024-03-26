// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		fish = parseInput(data),
		count = simulateFish(fish, 80);

	return count;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		fish = parseInput(data),
		count = simulateFish(fish, 256);

	console.log(count);

	return count;
}

//Run
solveA("example_a", "06");

// Functions
function parseInput(data: string) {
	return data.split(",").map(Number);
}
function simulateFish(fish: number[], days: number) {
	for (let day = 0; day < days; day++) {
		const newFish: number[] = [];

		for (let i = 0; i < fish.length; i++) {
			const remainingDays = fish[i] - 1;

			if (remainingDays < 0) {
				fish[i] = 6;
				newFish.push(8);
			} else {
				fish[i] = remainingDays;
			}
		}

		fish = fish.concat(newFish);
	}

	return fish.length;
}
