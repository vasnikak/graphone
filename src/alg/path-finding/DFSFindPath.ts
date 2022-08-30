import Graph from '../../Graph';
import Path from '../../Path';
import Vertex, { VertexLabelType } from '../../Vertex';
import FindPathAlgorithmExecutionStats from './FindPathAlgorithmExecutionStats';
import { GraphAlgorithmOptions } from '../GraphAlgorithm';
import FindPathGraphAlgorithm from './FindSinglePathGraphAlgorithm';

interface StackItem {
    vertex: Vertex;
    parent: Vertex | null;
}

/**
 * DFS (Depth First Search) algorithm. 
 * It discovers at path in a graph between two vertices using the DFS algorithm.
 */
export default class DFSFindPath extends FindPathGraphAlgorithm {

    /**
     * The name of the algorithm.
     */
     public static readonly algorithmName: string = 'DFS shortest path';

    constructor(graph: Graph, options?: GraphAlgorithmOptions) {
        super(graph, options);
    }

    /**
     * Finds a path between two vertices in a graph using the DFS algorithm.
     * @param startLabel the label of the starting vertex
     * @param endLabel the label of the destination vertex
     * @return the shortest path from start to end
     */
    public findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path {
        // Exec stats
        this.execStats = new FindPathAlgorithmExecutionStats(DFSFindPath.algorithmName);
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

        // We need a stack to store the vertices that wait to be examined
        const stack: StackItem[] = [];
        // We need an index to be able to extract the path after the execution of the algorithm
        const visited: Map<VertexLabelType, StackItem> = new Map();

        // Push the start vertex in the stack
        const first: StackItem = { vertex: startVertex, parent: null };
        stack.push(first);
        visited.set(startLabel, first);
        // We will assign the destination stack item to this variable
        let target: StackItem | null = null;
        // While the stack is not empty
        while (stack.length > 0) {
            // Get the stack's first vertex
            const current = stack.shift();
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
                        // Push the vertex in the stack
                        const child: StackItem = { vertex: edge.getDestination(), parent: current.vertex };
                        stack.unshift(child);
                        // Mark the vertex as visited
                        visited.set(edge.getDestination().getLabel(), child);
                    }
                });
            // If a collision resolution function was defined
            } else {
                // Create a temporary list to resolve collisions
                const children: StackItem[] = [];
                current?.vertex.getOutEdges().forEach(edge => {
                    // If we haven't visited yet the child vertex
                    if (!visited.has(edge.getDestination().getLabel())) {
                        // Add the vertex in the temporary list
                        const child: StackItem = { vertex: edge.getDestination(), parent: current.vertex };
                        children.push(child);
                        // Mark the vertex as visited
                        visited.set(edge.getDestination().getLabel(), child);
                    }
                });
                // Sort the list using the collision resolution comparator
                children.sort((a: StackItem, b: StackItem): number => {
                    return this.options.collisionRes!(a.vertex.getData(), b.vertex.getData());
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
            path.prepend(run.vertex);
            run = run.parent ? visited.get(run.parent.getLabel()) as StackItem : null;
        }

        // Exec stats
        this.execStats.stopExecution();
        (this.execStats as FindPathAlgorithmExecutionStats).setSolutionFound(target !== null);
        (this.execStats as FindPathAlgorithmExecutionStats).setPathLength(path.length());

        return path;
    }

}
