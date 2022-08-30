import Graph from '../../Graph';
import { HeuristicFunction } from '../../heuristics/heuristics';
import Path from '../../Path';
import { VertexLabelType } from '../../Vertex';
import { GraphAlgorithmOptions } from '../GraphAlgorithm';
import FindSinglePathGraphAlgorithm from './FindSinglePathGraphAlgorithm';

/**
 * The available options for a heuristic path finding algorithm.
 */
export interface HeuristicGraphAlgorithmOptions extends GraphAlgorithmOptions {
    /** The heuristic function. If non is provided, it will be ignored. */
    heuristicFunc?: HeuristicFunction;
};

/**
 * The algorithms of this type discover a path between two vertices in a graph,
 * by using a heuristic function.
 */
export default abstract class HeuristicFindPathGraphAlgorithm extends FindSinglePathGraphAlgorithm {

    constructor(graph: Graph, options?: HeuristicGraphAlgorithmOptions) {
        super(graph, options);
    }

    /**
     * Finds a path between two vertices in a graph.
     * @param startLabel the label of the starting vertex
     * @param endLabel the label of the destination vertex
     * @return the shortest path from start to end
     */
     public abstract findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path;

}
