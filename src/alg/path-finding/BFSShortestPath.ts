import Graph from "../../Graph";
import Path from "../../Path";
import Vertex, { VertexLabelType } from "../../Vertex";
import FindPathAlgorithmExecutionStats from "../FindPathAlgorithmExecutionStats";
import GraphAlgorithm, { CollisionResolutionFunc } from "../GraphAlgorithm";

interface QueueItem {
    node: Vertex;
    parent: Vertex | null;
}

/**
 * BFS (Breadth First Search) algorithm. 
 * It discovers at path in a graph between two vertices using the BFS algorithm.
 */
export default class BFSShortestPath extends GraphAlgorithm {

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
        // Find the corresponding vertices
        const start = this.graph.getVertex(startLabel);
        if (!start)
            return new Path();
        const end = this.graph.getVertex(endLabel);
        if (!end)
            return new Path();
        
        // Exec stats
        this.execStats = new FindPathAlgorithmExecutionStats('BFS shortest path');
        this.execStats.reset();

        // We need a queue to store the nodes that wait to be examined
        const queue: QueueItem[] = [];
        // We need an index to be able to extract the path after the execution of the algorithm
        const visited: Map<VertexLabelType, QueueItem> = new Map();

        // Push the starting node into the queue
        const first: QueueItem = { node: start, parent: null };
        queue.push(first);
        visited.set(startLabel, first);
        // We will assign the destination queue item to this variable
        let target: QueueItem | null = null;
        // While the queue is not empty
        while (queue.length > 0) {
            // Get the queue's first node
            const current = queue.pop();
            // Exec stats
            this.execStats.incNodesVisitedNum();
            // If it is the destination, stop the iteration
            if (current?.node.equals(end)) {
                target = current;
                break;
            }
            // If no collision resolution function was defined
            if (!this.collisionRes) {
                current?.node.getEdges().forEach(edge => {
                    // If we haven't visited yet the child node
                    if (!visited.has(edge.getVertex().getLabel())) {
                        // Push the node in the queue
                        const child: QueueItem = { node: edge.getVertex(), parent: current.node };
                        queue.unshift(child);
                        // Mark the node as visited
                        visited.set(edge.getVertex().getLabel(), child);
                    }
                });
            // If a collision resolution function was defined
            } else {
                // Create a temporary list to resolve collisions
                const children: QueueItem[] = []
                current?.node.getEdges().forEach(edge => {
                    // If we haven't visited yet the child node
                    if (!visited.has(edge.getVertex().getLabel())) {
                        // Add the node in the temporary list
                        const child: QueueItem = { node: edge.getVertex(), parent: current.node };
                        children.push(child);
                        // Mark the node as visited
                        visited.set(edge.getVertex().getLabel(), child);
                    }
                });
                // Sort the list using the collision resolution comparator
                children.sort((a: QueueItem, b: QueueItem): number => {
                    return this.collisionRes ? this.collisionRes(a.node, b.node) : 0;
                });
                // Push the list items into the queue
                children.forEach(child => queue.unshift(child));
            }
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
