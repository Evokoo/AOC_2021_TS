// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		packet = parseInput(data),
		versionTotal = processPacket(packet);

	return versionTotal;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "16");

// Functions
function parseInput(data: string) {
	const lookup: Record<string, string> = {
		"0": "0000",
		"1": "0001",
		"2": "0010",
		"3": "0011",
		"4": "0100",
		"5": "0101",
		"6": "0110",
		"7": "0111",
		"8": "1000",
		"9": "1001",
		A: "1010",
		B: "1011",
		C: "1100",
		D: "1101",
		E: "1110",
		F: "1111",
	};

	return data.replace(/./g, (hex) => lookup[hex]);
}
function literalPacketValue(packet: string): number {
	let value: string = "";

	while (true) {
		const group = packet.slice(0, 5).padEnd(5, "0");

		value += group.slice(1);
		packet = packet.slice(5);

		if (group[0] === "0") {
			break;
		}
	}

	return parseInt(value, 2);
}
function getPacketHeader(packet: string): [number, number] {
	const version = parseInt(packet.slice(0, 3), 2);
	const typeID = parseInt(packet.slice(3, 6), 2);

	return [version, typeID];
}

function processPacket(packet: string, count: number = -1): number {
	if (!packet || parseInt(packet, 2) === 0) {
		return 0;
	}

	if (count === 0) {
		return processPacket(packet, -1);
	}

	const [version, id] = getPacketHeader(packet);

	if (id === 4) {
		let index = 6;

		while (packet[index] === "1") {
			index += 5;
		}

		// const val = literalPacketValue(packet.slice(6, index + 5));
		return version + processPacket(packet.slice(index + 5), -1);
	}

	switch (packet[6]) {
		case "0":
			const packetSize = parseInt(packet.slice(7, 22), 2);
			return (
				version +
				processPacket(packet.slice(22, 22 + packetSize), -1) +
				processPacket(packet.slice(22 + packetSize), count - 1)
			);
		case "1":
			const packetCount = parseInt(packet.slice(7, 18), 2);
			return version + processPacket(packet.slice(18), packetCount);
		default:
			throw Error("Invalid length ID");
	}
}
