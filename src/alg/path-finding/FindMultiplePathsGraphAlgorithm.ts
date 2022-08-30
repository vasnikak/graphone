import Graph from '../../Graph';
import GraphAlgorithm, { GraphAlgorithmOptions } from '../GraphAlgorithm';

/**
 * The algorithms of this type discover multiple paths from a start vertex to other
 * vertices of the graph.
 */
export default abstract class FindMultiplePathsGraphAlgorithm extends GraphAlgorithm {

    constructor(graph: Graph, options?: GraphAlgorithmOptions) {
        super(graph, options);
    }

}
