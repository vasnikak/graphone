import Graph from "../../Graph";
import Vertex, { VertexLabelType } from "../../Vertex";
import AlgorithmExecutionStats from "../AlgorithmExecutionStats";
import { CollisionResolutionFunc } from "../GraphAlgorithm";
import TraversalGraphAlgorithm from "./TraversalGraphAlgorithm";

/**
 * Traverses a graph using DFS.
 */
export default class DFSTraversal extends TraversalGraphAlgorithm {

    /**
     * The name of the algorithm.
     */
    public static readonly algorithmName: string = 'DFS traversal';

    constructor(graph: Graph, collisionRes?: CollisionResolutionFunc) {
        super(graph, collisionRes);
    }

    /** {@inheritDoc TraversalGraphAlgorithm.traverse} */
    public traverse(startLabel: VertexLabelType, traverseAction: (vertex: Vertex) => any) {
        // Exec stats
        this.execStats = new AlgorithmExecutionStats(DFSTraversal.algorithmName);
        this.execStats.reset();

        // Find the start vertex
        const startVertex = this.graph.getVertex(startLabel);
        if (!startVertex) {
            this.execStats.stopExecution();
            return;
        }

        // We need a stack to store the nodes that wait to be examined
        const stack: Vertex[] = [];
        // We need an index to store the already visited verticies
        const visited: Map<VertexLabelType, Vertex> = new Map();

        // Push the start node in the stack
        stack.push(startVertex);
        visited.set(startLabel, startVertex);
        // While the stack is not empty
        while (stack.length > 0) {
            // Get the stack's first node
            const current = stack.shift() as Vertex;
            // Exec stats
            this.execStats.incNodesVisitedNum();
            // Visit the node
            const traverseRet = traverseAction(current);
            // If the return value is false, terminate the iteration
            if (traverseRet === false)
                break;
            // If no collision resolution function was defined
            if (!this.collisionRes) {
                current.getOutEdges().forEach(edge => {
                    // If we haven't visited yet the child node
                    if (!visited.has(edge.getDestination().getLabel())) {
                        const child = edge.getDestination();
                        // Push the node in the stack
                        stack.unshift(child);
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
                    return this.collisionRes!(a.getData(), b.getData());
                });
                // Push the list items in the stack in a reverse order
                // (we are pushing the items in a stack)
                for (let i = children.length - 1; i >= 0; i--)
                    stack.unshift(children[i]);
            }
        }

        // Exec stats
        this.execStats.stopExecution();
    }

}
