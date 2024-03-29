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
	const data = TOOLS.readData(fileName, day),
		connections = parseInput(data),
		routes = findRoutes(connections, true);

	console.log(routes.size);

	return routes.size;
}

//Run
solveB("example_b", "12");

// Functions
type Connections = Map<string, Set<string>>;
type Route = {
	location: string;
	visited: Set<string>;
	route: string[];
	revisit: boolean;
};

function parseInput(data: string) {
	const connections: Connections = new Map();

	for (let line of data.split("\r\n")) {
		const [a, b] = line.split("-");

		connections.set(a, (connections.get(a) ?? new Set()).add(b));
		connections.set(b, (connections.get(b) ?? new Set()).add(a));
	}

	return connections;
}
function findRoutes(connections: Connections, canRevisit: boolean = false) {
	const queue: Route[] = [
		{
			location: "start",
			visited: new Set(["start"]),
			route: ["start"],
			revisit: true,
		},
	];
	const uniqueRoutes: Set<string> = new Set();

	while (queue.length) {
		const current = queue.pop()!;

		if (current.location === "end") {
			uniqueRoutes.add(current.route.join("->"));
			continue;
		}

		for (let path of connections.get(current.location)!) {
			if (path === "start") continue;

			let updatedVisit: Set<string>;
			let revistStatus: boolean;

			if (/^[a-z]/.test(path)) {
				if (canRevisit && current.revisit && current.route.includes(path)) {
					updatedVisit = new Set([...current.visited, path]);
					revistStatus = false;
				} else if (current.visited.has(path)) {
					continue;
				} else {
					updatedVisit = new Set([...current.visited, path]);
					revistStatus = current.revisit;
				}
			} else {
				updatedVisit = current.visited;
				revistStatus = current.revisit;
			}

			queue.push({
				location: path,
				visited: updatedVisit,
				route: [...current.route, path],
				revisit: revistStatus,
			});
		}
	}

	return uniqueRoutes;
}
