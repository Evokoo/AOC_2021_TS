// Imports
import TOOLS from "../00/tools";
import ALU from "./ALU";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data);

	runALU(instructions);
	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "24");

type Instruction = {
	action: string;
	a: string;
	b: string | number | undefined;
};

// Functions
function parseInput(data: string) {
	const instructions: Instruction[] = [];

	for (let line of data.split("\r\n")) {
		const [action, a, b] = line.split(" ");

		instructions.push({
			action,
			a,
			b: /\d/.test(b) ? +b : b,
		});
	}

	return instructions;
}
function runALU(instructions: Instruction[]) {
	//BRUTE FORCE WON'T WORK!
	const seen: Set<string> = new Set();

	for (let model = 99999999999999; model >= 11111111111111; model--) {
		const digits = [...String(model)].map(Number).sort();
		const num = digits.join("");

		if (seen.has(num) || /0/.test(num)) continue;
		else seen.add(num);

		const unit = new ALU(digits);

		for (let instruction of instructions) {
			unit.run(instruction);
		}

		if (unit.result.get("z") === 0) {
			console.log(model);
			throw Error("Found");
		}
	}
}
