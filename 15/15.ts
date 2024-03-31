// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		cave = parseInput(data),
		lowestRisk = navigateCave(cave);

	return lowestRisk;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		cave = parseInput(data, true),
		lowestRisk = navigateCave(cave);

	return lowestRisk;
}

//Run
solveB("example_b", "15");

// Functions
type Point = { x: number; y: number };
type Cave = { grid: number[][]; start: Point; end: Point };
type Route = {
	location: Point;
	gCost: number;
	hCost: number;
	fCost: number;
};

function parseInput(data: string, expandGrid: boolean = false) {
	const baseGrid = data.split("\r\n").map((row) => [...row].map(Number));
	const start = { x: 0, y: 0 };
	const size = baseGrid.length;

	if (expandGrid) {
		const expandedGrid = Array.from({ length: size * 5 }, () =>
			Array.from({ length: size * 5 }, () => 0)
		);

		for (let y = 0; y < size * 5; y++) {
			for (let x = 0; x < size * 5; x++) {
				let value: number;

				if (x >= size) {
					value = expandedGrid[y][x - size] + 1;
				} else if (y >= size) {
					value = expandedGrid[y - size][x] + 1;
				} else {
					value = baseGrid[y][x];
				}

				expandedGrid[y][x] = value > 9 ? 1 : value;
			}
		}

		return {
			grid: expandedGrid,
			start,
			end: { x: size * 5 - 1, y: size * 5 - 1 },
		};
	}

	return { grid: baseGrid, start, end: { x: size - 1, y: size - 1 } };
}
function navigateCave({ grid, start, end }: Cave) {
	const queue: Route[] = [
		{
			location: start,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		},
	];
	const seen: Set<string> = new Set();

	while (queue.length) {
		const current = queue.shift()!;
		const coord = `${current.location.x},${current.location.y}`;

		if (current.location.x === end.x && current.location.y === end.y) {
			return current.gCost;
		}

		if (seen.has(coord)) {
			continue;
		} else {
			seen.add(coord);
		}

		for (const { x, y } of getNeighbours(current.location, grid)) {
			const neighbour = `${x},${y}`;

			if (seen.has(neighbour)) continue;

			const newGcost = current.gCost + grid[y][x];
			const newHcost = TOOLS.manhattanDistance({ x, y }, end);

			queue.push({
				location: { x, y },
				gCost: newGcost,
				hCost: newHcost,
				fCost: newGcost + newHcost,
			});
		}

		queue.sort((a, b) => a.fCost - b.fCost);
	}

	throw Error("...Something went wrong, no path found!");
}
function getNeighbours(point: Point, grid: number[][]): Point[] {
	const neighbours: Point[] = [];
	const width = grid[0].length;
	const height = grid.length;

	for (let [nx, ny] of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	]) {
		const [x, y] = [point.x + nx, point.y + ny];

		if (x < 0 || y < 0 || x >= width || y >= height) continue;
		else neighbours.push({ x, y });
	}

	return neighbours;
}
