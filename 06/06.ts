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

	return count;
}

//Run
solveB("example_b", "06");

// Functions
function parseInput(data: string) {
	return data.split(",").map(Number);
}
function simulateFish(fish: number[], days: number) {
	let spawnDay: Map<number, number> = new Map();
	let count = fish.length;

	for (let i = 0; i < fish.length; i++) {
		const day = fish[i] + 1;
		spawnDay.set(day, (spawnDay.get(day) ?? 0) + 1);
	}

	for (let day = 0; day <= days; day++) {
		if (spawnDay.has(day)) {
			const newFish = spawnDay.get(day)!;

			spawnDay.set(day + 7, (spawnDay.get(day + 7) ?? 0) + newFish);
			spawnDay.set(day + 9, (spawnDay.get(day + 9) ?? 0) + newFish);

			count += newFish;
			spawnDay.delete(day);
		}
	}

	return count;
}
