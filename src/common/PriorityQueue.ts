
// TODO: implement the priority queue with a more performant data structure
/**
 * Implements a priority queue.
 */
export default class PriorityQueue<V> {


    private queue: V[];
    private comparator: (a: any, b: any) => number;

    constructor(comparator: (a: any, b: any) => number) {
        this.queue = [];
        this.comparator = comparator;
    }

    public isEmpty() {
        return (this.queue.length === 0);
    }

    public push(item: V) {
        this.queue.push(item);
        this.queue.sort(this.comparator);
    }

    public peek(): V | undefined {
        return (this.queue.length > 0) ? this.queue[0] : undefined;
    }

    public pop(): V | undefined {
        return this.queue.shift();
    }

    public getItems(): V[] {
        return this.queue;
    }

    public rearrange() {
        this.queue.sort(this.comparator);
    }

}
