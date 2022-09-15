import { randomInt } from '../../common/utils';
import Graph from '../../Graph';
import Vertex, { VertexLabelType } from '../../Vertex';
import AlgorithmExecutionStats from '../AlgorithmExecutionStats';
import { GraphAlgorithmOptions } from '../GraphAlgorithm';
import TraversalGraphAlgorithm from './TraversalGraphAlgorithm';

/**
 * Traverses a graph using random walk traversal.
 */
export default class RandomWalkTraversal extends TraversalGraphAlgorithm {

    /**
     * The name of the algorithm.
     */
    public static readonly ALGORITHM_NAME: string = 'Random walk traversal';

    /**
     * Default number of maximum hops.
     */
    public static readonly DEFAULT_MAX_HOPS = 100;

    /**
     * The maximum number of hops.
     */
    private maxHops: number;

    /**
     * Random Walk graversal.
     * @param graph the graph
     * @param options the options
     * @param maxHops the maximum number of steps
     */
    constructor(graph: Graph, options?: GraphAlgorithmOptions, maxHops?: number) {
        super(graph, options);
        if (!maxHops || maxHops < 0)
            maxHops = RandomWalkTraversal.DEFAULT_MAX_HOPS;
        this.maxHops = maxHops;
    }

    /**
     * Traverses the vertices of the graph using random walk traversal.
     * The second argument is the action that will be executed on each vertex of the graph during the traversal.
     * In case that the function returns false, the traversal will stop.
     * @param startLabel the label of the starting vertex
     * @param traverseAction the action that will executed on each vertex during the traversal
     */
     public traverse(startLabel: VertexLabelType, traverseAction: (vertex: Vertex) => any) {
        // Exec stats
        this.execStats = new AlgorithmExecutionStats(RandomWalkTraversal.ALGORITHM_NAME);
        this.execStats.reset();

        // Find the start vertex
        const startVertex = this.graph.getVertex(startLabel);
        if (!startVertex) {
            this.execStats.stopExecution();
            return;
        }

        let vertex = startVertex;
        let hops = 0;
        while (hops < this.maxHops) {
            this.execStats.incVerticesVisitedNum();
            hops++;
            if (!traverseAction(vertex) === false)
                break;
            const neighbors = vertex.getOutNeighbors();
            if (neighbors.length > 0) {
                const idx = randomInt(0, neighbors.length - 1);
                vertex = neighbors[idx];
            }
        }

        this.execStats.stopExecution();
    }

}
