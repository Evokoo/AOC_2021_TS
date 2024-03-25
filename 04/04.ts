// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ drawn, games } = parseInput(data),
		score = playBingo(drawn, games);
	return score;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ drawn, games } = parseInput(data),
		score = playBingo(drawn, games, true);

	return score;
}

//Run
solveB("example_b", "04");

// Functions
type Point = { x: number; y: number };
type LineScore = [number, number, number, number, number];
type Game = {
	location: Map<number, Point>;
	board: number[][];
	lineScore: { x: LineScore; y: LineScore };
};

function matchNumbers(input: string): number[] {
	return (input.match(/\d+/g) || []).map(Number);
}
function parseInput(data: string) {
	const sections = data.split(/\r\n\s*\r\n/g);
	const drawn: number[] = matchNumbers(sections.shift()!);
	const games: Game[] = [];

	for (let section of sections) {
		const location: Map<number, Point> = new Map();
		const board = section.split("\r\n").map((row) => matchNumbers(row));
		const lineScore = {
			x: [0, 0, 0, 0, 0] as LineScore,
			y: [0, 0, 0, 0, 0] as LineScore,
		};

		for (let y = 0; y < board.length; y++) {
			for (let x = 0; x < board[0].length; x++) {
				location.set(board[y][x], { x, y });
			}
		}

		games.push({ location, board, lineScore });
	}

	return { drawn, games };
}
function playBingo(drawn: number[], games: Game[], partB: boolean = false) {
	const completeGames: Set<number> = new Set();

	for (let currentNumber of drawn) {
		for (let i = 0; i < games.length; i++) {
			if (completeGames.has(i)) {
				continue;
			}

			const currentGame = games[i];
			const rows = currentGame.lineScore.y;
			const columns = currentGame.lineScore.x;

			if (currentGame.location.has(currentNumber)) {
				const { x, y } = currentGame.location.get(currentNumber)!;
				columns[x]++;
				rows[y]++;
				currentGame.location.delete(currentNumber);
			} else {
				continue;
			}

			if (rows.includes(5) || columns.includes(5)) {
				let score = 0;

				for (let [number, _] of currentGame.location) {
					score += number;
				}

				if (partB) {
					completeGames.add(i);

					if (completeGames.size === games.length) {
						return score * currentNumber;
					}
				} else {
					return score * currentNumber;
				}
			}
		}
	}

	throw Error("No winners found");
}
