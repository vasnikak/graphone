import Graph from "../../Graph";
import Path from "../../Path";
import Vertex, { VertexLabelType } from "../../Vertex";
import FindPathAlgorithmExecutionStats from "./FindPathAlgorithmExecutionStats";
import { GraphAlgorithmOptions } from "../GraphAlgorithm";
import FindSinglePathGraphAlgorithm from "./FindSinglePathGraphAlgorithm";

interface QueueItem {
    vertex: Vertex;
    parent: Vertex | null;
}

/**
 * BFS (Breadth First Search) algorithm. 
 * It discovers at path in a graph between two vertices using the BFS algorithm.
 */
export default class BFSShortestPath extends FindSinglePathGraphAlgorithm {

    /**
     * The name of the algorithm.
     */
     public static readonly algorithmName: string = 'BFS shortest path';

    constructor(graph: Graph, options?: GraphAlgorithmOptions) {
        super(graph, options);
    }

    /**
     * Finds a path between two vertices in a graph using the BFS algorithm.
     * @param startLabel the label of the starting vertex
     * @param endLabel the label of the destination vertex
     * @return the shortest path from start to end
     */
    public findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path {
        // Exec stats
        this.execStats = new FindPathAlgorithmExecutionStats(BFSShortestPath.algorithmName);
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

        // We need a queue to store the vertices that wait to be examined
        const queue: QueueItem[] = [];
        // We need an index to be able to extract the path after the execution of the algorithm
        const visited: Map<VertexLabelType, QueueItem> = new Map();

        // Push the start vertex into the queue
        const first: QueueItem = { vertex: startVertex, parent: null };
        queue.push(first);
        visited.set(startLabel, first);
        // We will assign the destination queue item to this variable
        let target: QueueItem | null = null;
        // While the queue is not empty
        while (queue.length > 0) {
            // Get the queue's first vertex
            const current = queue.pop();
            // Exec stats
            this.execStats.incVerticesVisitedNum();
            // If it is the destination, stop the iteration
            if (current?.vertex.equals(endVertex)) {
                target = current;
                break;
            }
            // If no collision resolution function was defined
            if (!this.options.collisionRes) {
                current?.vertex.getOutEdges().forEach(edge => {
                    // If we haven't visited yet the child vertex
                    if (!visited.has(edge.getDestination().getLabel())) {
                        // Push the vertex in the queue
                        const child: QueueItem = { vertex: edge.getDestination(), parent: current.vertex };
                        queue.unshift(child);
                        // Mark the vertex as visited
                        visited.set(edge.getDestination().getLabel(), child);
                    }
                });
            // If a collision resolution function was defined
            } else {
                // Create a temporary list to resolve collisions
                const children: QueueItem[] = [];
                current?.vertex.getOutEdges().forEach(edge => {
                    // If we haven't visited yet the child vertex
                    if (!visited.has(edge.getDestination().getLabel())) {
                        // Add the vertex in the temporary list
                        const child: QueueItem = { vertex: edge.getDestination(), parent: current.vertex };
                        children.push(child);
                        // Mark the vertex as visited
                        visited.set(edge.getDestination().getLabel(), child);
                    }
                });
                // Sort the list using the collision resolution comparator
                children.sort((a: QueueItem, b: QueueItem): number => {
                    return this.options.collisionRes!(a.vertex.getData(), b.vertex.getData());
                });
                // Push the list items into the queue
                children.forEach(child => queue.unshift(child));
            }
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
