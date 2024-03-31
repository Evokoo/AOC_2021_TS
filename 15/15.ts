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
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "15");

// Functions
type Point = { x: number; y: number };
type Cave = { grid: number[][]; start: Point; end: Point };
type Route = {
	location: Point;
	gCost: number;
	hCost: number;
	fCost: number;
};

function parseInput(data: string) {
	const grid = data.split("\r\n").map((row) => [...row].map(Number));
	const start = { x: 0, y: 0 };
	const end = { x: grid[0].length - 1, y: grid.length - 1 };

	return { grid, start, end };
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
