export class ListNode<T> {
	data: T;
	next: ListNode<T> | null;

	constructor(data: T) {
		this.data = data;
		this.next = null;
	}
}

export class LinkedList<T> {
	head: ListNode<T> | null;
	tail: ListNode<T> | null;
	itemFrequency: Map<T, number>;
	size: number;

	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
		this.itemFrequency = new Map();
	}

	updateFrequency = (data: T): void => {
		const currentCount = this.itemFrequency.get(data) ?? 0;
		this.itemFrequency.set(data, currentCount + 1);
	};

	getItemFrequency = (data: T): number => {
		return this.itemFrequency.get(data) ?? 0;
	};

	append = (data: T): void => {
		this.updateFrequency(data);

		const newNode = new ListNode<T>(data);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail!.next = newNode;
			this.tail = newNode;
		}
		this.size++;
	};

	insert = (node: ListNode<T>, data: T): void => {
		this.updateFrequency(data);

		const newNode = new ListNode<T>(data);
		const nextNode = node.next;

		node.next = newNode;
		newNode.next = nextNode;

		this.size++;
	};

	print = (): string => {
		const listItems: T[] = [];

		let current = this.head;

		while (current !== null) {
			listItems.push(current!.data);
			current = current!.next;
		}

		return listItems.join("");
	};
}
