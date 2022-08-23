import Graph from "../../Graph";
import Path from "../../Path";
import Vertex, { VertexLabelType } from "../../Vertex";
import FindPathAlgorithmExecutionStats from "../FindPathAlgorithmExecutionStats";
import GraphAlgorithm, { CollisionResolutionFunc } from "../GraphAlgorithm";

interface StackItem {
    node: Vertex;
    parent: Vertex | null;
}

/**
 * DFS (Depth First Search) algorithm. 
 * It discovers at path in a graph between two vertices using the DFS algorithm.
 */
export default class DFSFindPath extends GraphAlgorithm {

    /**
     * Collision resolution function.
     */
    private collisionRes: CollisionResolutionFunc | undefined;

    constructor(graph: Graph, collisionRes?: CollisionResolutionFunc) {
        super(graph);
        this.collisionRes = collisionRes;
    }

    /**
     * Finds a path between two nodes in a graph using the DFS algorithm.
     * @param startLabel the label of the starting vertex
     * @param endLabel the label of the destination vertex
     * @return the shortest path from start to end
     */
     public findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path {
        // Exec stats
        this.execStats = new FindPathAlgorithmExecutionStats('DFS find path');
        this.execStats.reset();

        // Find the corresponding vertices
        const start = this.graph.getVertex(startLabel);
        if (!start) {
            this.execStats.stopExecution();
            return new Path();
        }
        const end = this.graph.getVertex(endLabel);
        if (!end) {
            this.execStats.stopExecution();
            return new Path();
        }

        // We need a stack to store the nodes that wait to be examined
        const stack: StackItem[] = [];
        // We need an index to be able to extract the path after the execution of the algorithm
        const visited: Map<VertexLabelType, StackItem> = new Map();

        // Push the starting node in the stack
        const first: StackItem = { node: start, parent: null };
        stack.push(first);
        visited.set(startLabel, first);
        // We will assign the destination stack item to this variable
        let target: StackItem | null = null;
        // While the stack is not empty
        while (stack.length > 0) {
            // Get the stack's first node
            const current = stack.shift();
            // Exec stats
            this.execStats.incNodesVisitedNum();
            // If it is the destination, stop the iteration
            if (current?.node.equals(end)) {
                target = current;
                break;
            }
            // If no collision resolution function was defined
            if (!this.collisionRes) {
                current?.node.getOutEdges().forEach(edge => {
                    // If we haven't visited yet the child node
                    if (!visited.has(edge.getDestination().getLabel())) {
                        // Push the node in the stack
                        const child: StackItem = { node: edge.getDestination(), parent: current.node };
                        stack.unshift(child);
                        // Mark the node as visited
                        visited.set(edge.getDestination().getLabel(), child);
                    }
                });
            // If a collision resolution function was defined
            } else {
                // Create a temporary list to resolve collisions
                const children: StackItem[] = []
                current?.node.getOutEdges().forEach(edge => {
                    // If we haven't visited yet the child node
                    if (!visited.has(edge.getDestination().getLabel())) {
                        // Add the node in the temporary list
                        const child: StackItem = { node: edge.getDestination(), parent: current.node };
                        children.push(child);
                        // Mark the node as visited
                        visited.set(edge.getDestination().getLabel(), child);
                    }
                });
                // Sort the list using the collision resolution comparator
                children.sort((a: StackItem, b: StackItem): number => {
                    return this.collisionRes ? this.collisionRes(a.node.getData(), b.node.getData()) : 0;
                });
                // Push the list items in the stack in a reverse order
                // (we are pushing the items in a stack)
                for (let i = children.length - 1; i >= 0; i--)
                    stack.unshift(children[i]);
            }
        }

        // Build the path from start to end
        const path = new Path();
        let run = target;
        while (run) {
            path.prepend(run.node);
            run = run.parent ? visited.get(run.parent.getLabel()) as StackItem : null;
        }

        // Exec stats
        this.execStats.stopExecution();
        (this.execStats as FindPathAlgorithmExecutionStats).setSolutionFound(target !== null);
        (this.execStats as FindPathAlgorithmExecutionStats).setPathLength(path.length());

        return path;
    }

}
