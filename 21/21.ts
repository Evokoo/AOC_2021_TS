// Imports
import TOOLS from "../00/tools";
import { Dice, GameBoard, Player } from "./Gameboard";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		players = parseInput(data),
		result = playGame(players);

	return result;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "21");

// Functions
function parseInput(data: string) {
	return data.split("\r\n").map((str) => +str.slice(-1));
}
function playGame(players: number[]) {
	const board = new GameBoard(10);
	const dice = new Dice();
	const p1 = new Player(players[0], board);
	const p2 = new Player(players[1], board);

	let playerTurn = 1;

	while (true) {
		let moves = dice.roll();

		if (playerTurn === 1) {
			p1.movePlayer(moves);
			playerTurn++;
		} else {
			p2.movePlayer(moves);
			playerTurn--;
		}

		if (p1.score >= 1000) {
			return dice.count * p2.score;
		}

		if (p2.score >= 1000) {
			return dice.count * p1.score;
		}
	}
}
