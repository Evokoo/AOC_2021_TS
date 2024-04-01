// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	console.log(processPacket(data));

	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "16");

// Functions
function hexToBin(hex: string) {
	return;
}

function parseInput(data: string) {
	return data.split("\r\n");
}

function literalPacketValue(packet: string): [number, string] {
	let value: string = "";

	while (true) {
		console.log(packet);
		const group = packet.slice(0, 5).padEnd(5, "0");

		value += group.slice(1);
		packet = packet.slice(5);

		if (group[0] === "0") {
			break;
		}
	}

	return [parseInt(value, 2), packet];
}
function convertPacket(hex: string) {
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

	return hex.replace(/./g, (hex) => lookup[hex]);
}
function getPacketHeader(packet: string): [string, string, string] {
	const version = packet.slice(0, 3);
	const typeID = packet.slice(3, 6);

	return [version, typeID, packet.slice(6)];
}

function processPacket(packet: string, versionTotal: number = 0) {
	if (/^0+$/.test(packet) || !packet) {
		return versionTotal;
	}

	if (/[^0-1]+/.test(packet)) {
		packet = convertPacket(packet);
	}

	const [version, ID, body] = getPacketHeader(packet);
	versionTotal += parseInt(version, 2);

	if (ID === "100") {
		const [_, remainingPacket] = literalPacketValue(body);
		return processPacket(remainingPacket, versionTotal);
	} else {
		if (body[0] === "0") {
			const packetSize = parseInt(body.slice(1, 16), 2);
			return processPacket(body.slice(16, 16 + packetSize), versionTotal);
		} else {
			const packetCount = parseInt(body.slice(1, 12), 2);

			let subBody = body.slice(12);
			let subVersionTotal = 0;
			let packetSize = { start: 7, end: 0 };

			for (let count = 0; count < packetCount; count++) {
				let [subVersion, subID] = [subBody.slice(0, 3), subBody.slice(3, 6)];

				if (subID === "100") {
					while (subBody[packetSize.start] !== "0") {
						packetSize.start += 5;
					}

					subVersionTotal += parseInt(subVersion, 2);
					subBody = subBody.slice(packetSize.start +);
				}

				packetSize.start = 7;
			}

			console.log(versionTotal + subVersionTotal);
		}
	}
}
