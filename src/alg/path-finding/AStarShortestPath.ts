import Graph from "../../Graph";
import Path from "../../Path";
import Vertex, { VertexLabelType } from "../../Vertex";
import FindPathAlgorithmExecutionStats from "./FindPathAlgorithmExecutionStats";
import { CollisionResolutionFunc } from "../GraphAlgorithm";
import { HeuristicFunction, zeroHeuristicFunction } from "../../heuristics/heuristics";
import FindPathGraphAlgorithm from "./FindPathGraphAlgorithm";

class QueueItem {

    node: Vertex;
    parent: Vertex | null;
    totalCost: number;
    eval: number;
    heuristicFunc: HeuristicFunction;

    constructor(node: Vertex, parent: Vertex | null, totalCost: number, heuristicFunc: HeuristicFunction) {
        this.node = node;
        this.parent = parent;
        this.totalCost = totalCost;
        this.heuristicFunc = heuristicFunc;
        this.eval = this.totalCost + this.heuristicFunc(this.node.getData());
    }

}

type PriorityQueueComparator = (a: QueueItem, b: QueueItem) => number;

// TODO: implement the priority queue with a more performant data structure
class PriorityQueue {

    private queue: QueueItem[];
    private comparator: PriorityQueueComparator;

    constructor(comparator: PriorityQueueComparator) {
        this.queue = [];
        this.comparator = comparator;
    }

    public isEmpty() {
        return (this.queue.length === 0);
    }

    public push(item: QueueItem) {
        this.queue.push(item);
        this.queue.sort(this.comparator);
    }

    public pop(): QueueItem | undefined {
        return this.queue.shift();
    }
}

/**
 * A* algorithm. 
 * It discovers the shortest path in a graph between two vertices using the
 * A* heuristic algorithm.
 */
export default class AStarShortestPath extends FindPathGraphAlgorithm {

    /**
     * The name of the algorithm.
     */
     public static readonly algorithmName: string = 'A* shortest path';

    /**
     * Collision resolution function.
     */
    protected collisionRes: CollisionResolutionFunc | undefined;
    /**
     * Heuristic function.
     */
    private heuristicFunc: HeuristicFunction;

    constructor(graph: Graph, heuristicFunc: HeuristicFunction = zeroHeuristicFunction, collisionRes?: CollisionResolutionFunc) {
        super(graph);
        this.heuristicFunc = heuristicFunc;
        this.collisionRes = collisionRes;
    }

    /** {@inheritDoc FindPathGraphAlgorithm.findPath} */
    public findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path {
        // Exec stats
        this.execStats = new FindPathAlgorithmExecutionStats(AStarShortestPath.algorithmName);
        this.execStats.reset();

        // Find the corresponding vertices
        const startVertex = this.graph.getVertex(startLabel);
        if (!startVertex) {
            this.execStats.stopExecution();
            return new Path();
        }
        const endVertex = this.graph.getVertex(endLabel);
        if (!endVertex) {
            this.execStats.stopExecution();
            return new Path();
        }
        
        // We need a priority queue to store the nodes that wait to be examined
        const aStarComparator = (a: QueueItem, b: QueueItem) => {
            return (a.eval !== b.eval || !this.collisionRes) ?
                    (a.eval - b.eval) :
                    this.collisionRes(a.node.getData(), b.node.getData());
        };
        const queue = new PriorityQueue(aStarComparator);
        // We need an index to be able to extract the path after the execution of the algorithm
        const visited: Map<VertexLabelType, QueueItem> = new Map();

        // Push the start node into the queue
        const first = new QueueItem(startVertex, null, 0, this.heuristicFunc);
        queue.push(first);
        visited.set(startLabel, first);
        // We will assign the destination queue item to this variable
        let target: QueueItem | null = null;
        // While the queue is not empty
        while (!queue.isEmpty()) {
            // Get the queue's first node
            const current = queue.pop();
            // Exec stats
            this.execStats.incNodesVisitedNum();
            // If it is the destination, stop the iteration
            if (current?.node.equals(endVertex)) {
                target = current;
                break;
            }
            // Add the neighbors of all outgoing edges in the queue
            current?.node.getOutEdges().forEach(edge => {
                // Calculate the total cost
                const totalCost = current.totalCost + edge.getWeight();
                // If we haven't visited yet the child node
                const child = visited.get(edge.getDestination().getLabel());
                if (!child) {
                     // Push the node into the queue
                     const child = new QueueItem(edge.getDestination(), current.node, totalCost, this.heuristicFunc);
                     queue.push(child);
                     // Mark the node as visited
                     visited.set(edge.getDestination().getLabel(), child);
                // If we have already visited the child node, we have to
                // check if its path from the root node has to be updated
                } else {
                    // If the new total cost is less than the existing one
                    if (totalCost < child.totalCost)
                        // Update child's path from the root
                        child.parent = current.node;
                }
            });
        }

        // Build the path from start to end
        const path = new Path();
        let run = target;
        while (run) {
            path.prepend(run.node);
            run = run.parent ? visited.get(run.parent.getLabel()) as QueueItem : null;
        }

        // Exec stats
        this.execStats.stopExecution();
        (this.execStats as FindPathAlgorithmExecutionStats).setSolutionFound(target !== null);
        (this.execStats as FindPathAlgorithmExecutionStats).setPathLength(path.length());

        return path;
    }

}
