// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ slugs, grid } = parseInput(data),
		turns = runSimulation(slugs, grid);

	return turns;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "25");

// Functions
type Slugs = Map<string, string>;
type Grid = { width: number; height: number };

function parseInput(data: string) {
	const grid = data.split("\r\n").map((row) => [...row]);
	const height = grid.length;
	const width = grid[0].length;
	const slugs: Slugs = new Map();

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (grid[y][x] === ".") continue;

			slugs.set(`${x},${y}`, grid[y][x] === ">" ? "E" : "S");
		}
	}

	return { slugs, grid: { width, height } };
}
function runSimulation(slugs: Slugs, grid: Grid) {
	function updateCoordinate(coord: string, direction: string) {
		const [x, y] = coord.split(",").map(Number);

		switch (direction) {
			case "E":
				return `${x + 1 >= grid.width ? 0 : x + 1},${y}`;
			case "S":
				return `${x},${y + 1 >= grid.height ? 0 : y + 1}`;
			default:
				throw Error("Invalid direction");
		}
	}
	function updateSlugs(
		insert: Set<string>,
		remove: Set<string>,
		direction: string
	) {
		for (let slug of remove) {
			slugs.delete(slug);
		}

		for (let slug of insert) {
			slugs.set(slug, direction);
		}
	}

	for (let turn = 1; true; turn++) {
		const insert: Set<string> = new Set();
		const remove: Set<string> = new Set();
		let totalUpdates: number = 0;

		for (let direction of ["E", "S"]) {
			for (let [coord, dir] of [...slugs].filter(
				(slug) => slug[1] === direction
			)) {
				const newCoordinate = updateCoordinate(coord, dir);

				if (!slugs.has(newCoordinate)) {
					remove.add(coord);
					insert.add(newCoordinate);
				}
			}

			updateSlugs(insert, remove, direction);
			totalUpdates += remove.size;
			insert.clear();
			remove.clear();
		}

		if (totalUpdates === 0) {
			return turn;
		}
	}
}

//Debug
function drawGrid(slugs: Slugs, { width, height }: Grid) {
	const grid = Array.from({ length: height }, () =>
		Array.from({ length: width }, () => ".")
	);

	for (let [coord, direction] of slugs) {
		const [x, y] = coord.split(",").map(Number);
		grid[y][x] = direction === "E" ? ">" : "V";
	}

	const img = grid.map((row) => row.join("")).join("\n");

	console.log(img + "\r\n\r\n");
}
