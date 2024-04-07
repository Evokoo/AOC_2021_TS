type Register = Map<string, number>;
type Instruction = {
	action: string;
	a: string;
	b: string | number | undefined;
};

export default class ALU {
	register: Map<string, number>;
	modelNumber: number[];

	constructor(model: number[]) {
		this.register = this.initializeRegister();
		this.modelNumber = model;
	}

	private initializeRegister = (): Register => {
		const registerID = ["w", "x", "y", "z"];
		const register: Register = new Map();

		for (let ID of registerID) {
			register.set(ID, 0);
		}

		return register;
	};

	private writeValue = (ID: string): void => {
		const digit = this.modelNumber.shift() ?? 0;

		if (digit === 0) throw Error("Invalid digit");
		else this.register.set(ID, digit);
	};

	private getValues = (
		a: string,
		b: string | number | undefined
	): [number, number] => {
		if (b === undefined) throw Error("b cannot be undefined");

		const valueA = this.register.get(a)!;
		const valueB = typeof b === "string" ? this.register.get(b)! : b;

		return [valueA, valueB];
	};

	public run = ({ action, a, b }: Instruction) => {
		switch (action) {
			case "inp":
				this.writeValue(a);
				break;
			default:
				const [valueA, valueB] = this.getValues(a, b);

				switch (action) {
					case "add":
						this.register.set(a, valueA + valueB);
						break;
					case "mul":
						this.register.set(a, valueA * valueB);
						break;
					case "div":
						this.register.set(a, ~~(valueA / valueB));
						break;
					case "mod":
						this.register.set(a, valueA % valueB);
						break;
					case "eql":
						this.register.set(a, valueA === valueB ? 1 : 0);
						break;
					default:
						throw Error("Invalid action type");
				}
		}
	};

	get result(): Register {
		return this.register;
	}
}
