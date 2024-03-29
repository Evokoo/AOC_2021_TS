// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		connections = parseInput(data),
		routes = findRoutes(connections);

	return routes.size;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "12");

// Functions
type Connections = Map<string, Set<string>>;
type Route = { location: string; visited: Set<string>; route: string[] };

function parseInput(data: string) {
	const connections: Connections = new Map();

	for (let line of data.split("\r\n")) {
		const [a, b] = line.split("-");

		connections.set(a, (connections.get(a) ?? new Set()).add(b));
		connections.set(b, (connections.get(b) ?? new Set()).add(a));
	}

	return connections;
}
function findRoutes(connections: Connections) {
	const queue: Route[] = [
		{ location: "start", visited: new Set(["start"]), route: ["start"] },
	];
	const uniqueRoutes: Set<string> = new Set();

	while (queue.length) {
		const current = queue.pop()!;

		if (current.location === "end") {
			uniqueRoutes.add(current.route.join("->"));
			continue;
		}

		for (let path of connections.get(current.location)!) {
			if (current.visited.has(path)) continue;

			queue.push({
				location: path,
				visited: /^[a-z]/.test(path)
					? new Set([...current.visited, path])
					: current.visited,
				route: [...current.route, path],
			});
		}
	}

	return uniqueRoutes;
}
