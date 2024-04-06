// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		inputData = parseInput(data),
		pixels = enchanceImage(inputData, 2);

	return pixels;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "20");

// Functions
type PixelMap = Map<string, boolean>;
type Range = { min: number; max: number };
type Point = { x: number; y: number };

interface InputData {
	lookup: string;
	pixels: PixelMap;
	range: { x: Range; y: Range };
}

function parseInput(data: string): InputData {
	const sections = data.split(/\r\n\s*\r\n/);
	const input: String[] = sections[1].split("\r\n");
	const xRange = { min: -1, max: input[0].length + 1 };
	const yRange = { min: -1, max: input.length + 1 };

	const pixels: PixelMap = new Map();

	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[0].length; x++) {
			pixels.set(`${x},${y}`, input[y][x] === "#");
		}
	}

	return { lookup: sections[0], pixels, range: { x: xRange, y: yRange } };
}
function enchanceImage({ lookup, pixels, range }: InputData, cycles: number) {
	const updates: Map<string, boolean> = new Map();

	function updatePixel(pixel: Point, cycle: number): string {
		let binary: string = "";

		for (let [nx, ny] of [
			[-1, -1],
			[0, -1],
			[1, -1],
			[-1, 0],
			[0, 0],
			[1, 0],
			[-1, 1],
			[0, 1],
			[1, 1],
		]) {
			const coord = `${nx + pixel.x},${ny + pixel.y}`;

			if (pixels.has(coord)) {
				binary += Number(pixels.get(coord));
			} else {
				const first = lookup[0];
				const last = lookup[lookup.length - 1];

				if (cycle % 2 === 0 && first === "#" && last === ".") {
					binary += 1;
				} else {
					binary += 0;
				}
			}
		}

		return lookup[parseInt(binary, 2)];
	}

	for (let cycle = 1; cycle <= cycles; cycle++) {
		for (let y = range.y.min; y < range.y.max; y++) {
			for (let x = range.x.min; x < range.x.max; x++) {
				const status = updatePixel({ x, y }, cycle);

				updates.set(`${x},${y}`, status === "#");
			}
		}

		for (let [coord, status] of updates) {
			pixels.set(coord, status);
			updates.delete(coord);
		}

		range.x.min--;
		range.x.max++;
		range.y.min--;
		range.y.max++;
	}

	return [...pixels].reduce((acc, [_, status]) => acc + (status ? 1 : 0), 0);
}

//Debug
function printPixels(pixels: PixelMap): void {
	const grid = Array.from({ length: 15 }, () =>
		Array.from({ length: 15 }, () => ".")
	);

	for (let [coord, status] of pixels) {
		if (status) {
			const [x, y] = coord.split(",").map(Number);
			grid[y + 5][x + 5] = "#";
		}
	}

	const img = grid.map((row) => row.join("")).join("\n");

	console.log(img);
}
