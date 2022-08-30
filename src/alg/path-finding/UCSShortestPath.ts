import Graph from '../../Graph';
import Path from '../../Path';
import { VertexLabelType } from '../../Vertex';
import { GraphAlgorithmOptions } from '../GraphAlgorithm';
import AStarShortestPath from './AStarShortestPath';
import FindSinglePathGraphAlgorithm from './FindSinglePathGraphAlgorithm';

/**
 * UCS (Uniform Cost Search) algorithm. 
 * It discovers the shortest path in a graph between two vertices using the
 * UCS algorithm.
 */
export default class UCSShortestPath extends FindSinglePathGraphAlgorithm {

    /**
     * The name of the algorithm.
     */
     public static readonly algorithmName: string = 'UCS shortest path';

    constructor(graph: Graph, options?: GraphAlgorithmOptions) {
        super(graph, options);
    }

    /**
     * Finds a path between two vertices in a graph using the UCS algorithm.
     * @param startLabel the label of the starting vertex
     * @param endLabel the label of the destination vertex
     * @return the shortest path from start to end
     */
    public findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path {
        const aStarShortestPath = new AStarShortestPath(this.graph, this.options);
        const path = aStarShortestPath.findPath(startLabel, endLabel);
        this.execStats = aStarShortestPath.getExecStats();
        this.execStats?.setAlgorithmName(UCSShortestPath.algorithmName);
        return path;
    }

}
