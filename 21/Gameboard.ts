class GameSpace {
	value: number;
	next: GameSpace | null;

	constructor(value: number) {
		this.value = value;
		this.next = null;
	}
}

export class GameBoard {
	head: GameSpace | null;
	tail: GameSpace | null;
	size: number;

	constructor(spaces: number) {
		this.head = null;
		this.tail = null;
		this.size = 0;

		this.init(spaces);
	}

	private init = (spaces: number): void => {
		for (let i = 1; i <= spaces; i++) {
			let newNode = new GameSpace(i);

			if (!this.head) {
				this.head = newNode;
				this.tail = newNode;
			} else {
				this.tail!.next = newNode;
				this.tail = newNode;
			}

			this.tail.next = this.head;
			this.size++;
		}
	};

	public setPlayer = (space: number): GameSpace | null => {
		let current = this.head;

		while (current) {
			if (current.value === space) {
				return current;
			}
			current = current.next;
		}

		throw Error("Space not found");
	};

	public movePlayer = (player: GameSpace, moves: number): GameSpace => {
		for (let i = 0; i < moves; i++) {
			player = player.next!;
		}

		return player;
	};
}

export class Dice {
	private dice: number[];
	private counter: number;

	constructor() {
		this.dice = [1, 2, 3];
		this.counter = 0;
	}

	private updateDice = () => {
		this.dice = this.dice.map((value) => {
			value += 3;
			return value > 100 ? value - 100 : value;
		});
	};

	roll = (): number => {
		const total = this.dice.reduce((a, b) => a + b, 0);

		this.updateDice();
		this.counter += 3;

		return total;
	};

	get count(): number {
		return this.counter;
	}
}

export class Player {
	space: GameSpace | null;
	score: number;

	constructor(spaceNumber: number, board: GameBoard) {
		this.space = board.setPlayer(spaceNumber);
		this.score = 0;
	}

	movePlayer = (moves: number): void => {
		for (let i = 0; i < moves; i++) {
			this.space = this.space!.next;
		}

		this.score += this.space!.value;
	};
}
