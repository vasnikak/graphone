import Graph from "../../Graph";
import Vertex, { VertexLabelType } from "../../Vertex";
import AlgorithmExecutionStats from "../AlgorithmExecutionStats";
import { GraphAlgorithmOptions } from "../GraphAlgorithm";
import TraversalGraphAlgorithm from "./TraversalGraphAlgorithm";

/**
 * Traverses a graph using BFS.
 */
export default class BFSTraversal extends TraversalGraphAlgorithm {

    /**
     * The name of the algorithm.
     */
    public static readonly algorithmName: string = 'BFS traversal';

    constructor(graph: Graph, options?: GraphAlgorithmOptions) {
        super(graph, options);
    }

    /**
     * Traverses the nodes of the graph using the BFS algorithm.
     * The second argument is the action that will be executed on each vertex of the graph during the traversal.
     * In case that the function returns false, the traversal will stop.
     * @param startLabel the label of the starting vertex
     * @param traverseAction the action that will executed on each vertex during the traversal
     */
    public traverse(startLabel: VertexLabelType, traverseAction: (vertex: Vertex) => any) {
        // Exec stats
        this.execStats = new AlgorithmExecutionStats(BFSTraversal.algorithmName);
        this.execStats.reset();

        // Find the start vertex
        const startVertex = this.graph.getVertex(startLabel);
        if (!startVertex) {
            this.execStats.stopExecution();
            return;
        }

        // We need a queue to store the nodes that wait to be examined
        const queue: Vertex[] = [];
        // We need an index to store the already visited verticies
        const visited: Map<VertexLabelType, Vertex> = new Map();

        // Push the start node in the queue
        queue.push(startVertex);
        visited.set(startLabel, startVertex);
        // While the queue is not empty
        while (queue.length > 0) {
            // Get the queue's first node
            const current = queue.pop() as Vertex;
            // Exec stats
            this.execStats.incNodesVisitedNum();
            // Visit the node
            const traverseRet = traverseAction(current);
            // If the return value is false, terminate the iteration
            if (traverseRet === false)
                break;
            // If no collision resolution function was defined
            if (!this.options.collisionRes) {
                current.getOutEdges().forEach(edge => {
                    // If we haven't visited yet the child node
                    if (!visited.has(edge.getDestination().getLabel())) {
                        const child = edge.getDestination();
                        // Push the node in the queue
                        queue.unshift(child);
                        // Mark the node as visited
                        visited.set(edge.getDestination().getLabel(), child);
                    }
                });
            // If a collision resolution function was defined
            } else {
                // Create a temporary list to resolve collisions
                const children: Vertex[] = [];
                current.getOutEdges().forEach(edge => {
                    // If we haven't visited yet the child node
                    if (!visited.has(edge.getDestination().getLabel())) {
                        const child = edge.getDestination();
                        // Add the node in the temporary list
                        children.push(child);
                        // Mark the node as visited
                        visited.set(edge.getDestination().getLabel(), child);
                    }
                });
                // Sort the list using the collision resolution comparator
                children.sort((a: Vertex, b: Vertex): number => {
                    return this.options.collisionRes!(a.getData(), b.getData());
                });
                // Push the list items into the queue
                children.forEach(child => queue.unshift(child));
            }
        }

        // Exec stats
        this.execStats.stopExecution();
    }

}
