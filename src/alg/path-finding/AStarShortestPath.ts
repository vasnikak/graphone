import Graph from "../../Graph";
import Path from "../../Path";
import Vertex, { VertexLabelType } from "../../Vertex";
import FindPathAlgorithmExecutionStats from "./FindPathAlgorithmExecutionStats";
import { HeuristicFunction, zeroHeuristicFunction } from "../../heuristics/heuristics";
import HeuristicFindPathGraphAlgorithm, { HeuristicGraphAlgorithmOptions } from "./HeuristicFindPathGraphAlgorithm";
import PriorityQueue from "../../common/PriorityQueue";

class QueueItem {

    vertex: Vertex;
    parent: Vertex | null;
    totalCost: number;
    eval: number;
    heuristicFunc: HeuristicFunction;

    constructor(vertex: Vertex, parent: Vertex | null, totalCost: number, heuristicFunc: HeuristicFunction) {
        this.vertex = vertex;
        this.parent = parent;
        this.totalCost = totalCost;
        this.heuristicFunc = heuristicFunc;
        this.eval = this.totalCost + this.heuristicFunc(this.vertex.getData());
    }

}

/**
 * A* algorithm. 
 * It discovers the shortest path in a graph between two vertices using the
 * A* heuristic algorithm.
 */
export default class AStarShortestPath extends HeuristicFindPathGraphAlgorithm {

    /**
     * The name of the algorithm.
     */
    public static readonly algorithmName: string = 'A* shortest path';

    constructor(graph: Graph, options?: HeuristicGraphAlgorithmOptions) {
        super(graph, options);
        if (!(this.options as HeuristicGraphAlgorithmOptions).heuristicFunc)
            (this.options as HeuristicGraphAlgorithmOptions).heuristicFunc = zeroHeuristicFunction;
    }

    /**
     * Finds a path between two vertices in a graph using the A* algorithm.
     * @param startLabel the label of the starting vertex
     * @param endLabel the label of the destination vertex
     * @return the shortest path from start to end
     */
    public findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path {
        // Exec stats
        this.execStats = new FindPathAlgorithmExecutionStats(AStarShortestPath.algorithmName);
        this.execStats.reset();

        // The heuristic function
        const heuristicFunc = (this.options as HeuristicGraphAlgorithmOptions).heuristicFunc;

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
        
        // We need a priority queue to store the vertices that wait to be examined
        const aStarComparator = (a: QueueItem, b: QueueItem) => {
            return (a.eval !== b.eval || !this.options.collisionRes) ?
                    (a.eval - b.eval) :
                    this.options.collisionRes(a.vertex.getData(), b.vertex.getData());
        };
        const queue = new PriorityQueue<QueueItem>(aStarComparator);
        // We need an index to be able to extract the path after the execution of the algorithm
        const visited: Map<VertexLabelType, QueueItem> = new Map();

        // Push the starting vertex into the queue
        const first = new QueueItem(startVertex, null, 0, heuristicFunc!);
        queue.push(first);
        visited.set(startLabel, first);
        // We will assign the destination queue item to this variable
        let target: QueueItem | null = null;
        // While the queue is not empty
        while (!queue.isEmpty()) {
            // Get the queue's first vertex
            const current = queue.pop();
            // Exec stats
            this.execStats.incVerticesVisitedNum();
            // If it is the destination, stop the iteration
            if (current?.vertex.equals(endVertex)) {
                target = current;
                break;
            }
            // Add the neighbors of all outgoing edges in the queue
            current?.vertex.getOutEdges().forEach(edge => {
                // Calculate the total cost
                const totalCost = current.totalCost + edge.getWeight();
                // If we haven't visited yet the child vertex
                const child = visited.get(edge.getDestination().getLabel());
                if (!child) {
                     // Push the vertex into the queue
                     const child = new QueueItem(edge.getDestination(), current.vertex, totalCost, heuristicFunc!);
                     queue.push(child);
                     // Mark the vertex as visited
                     visited.set(edge.getDestination().getLabel(), child);
                // If we have already visited the child vertex, we have to
                // check if its path from the root vertex has to be updated
                } else {
                    // If the new total cost is less than the existing one
                    if (totalCost < child.totalCost)
                        // Update child's path from the root
                        child.parent = current.vertex;
                }
            });
        }

        // Build the path from start to end
        const path = new Path();
        let run = target;
        while (run) {
            path.prepend(run.vertex);
            run = run.parent ? visited.get(run.parent.getLabel()) as QueueItem : null;
        }

        // Exec stats
        this.execStats.stopExecution();
        (this.execStats as FindPathAlgorithmExecutionStats).setSolutionFound(target !== null);
        (this.execStats as FindPathAlgorithmExecutionStats).setPathLength(path.length());

        return path;
    }

}
