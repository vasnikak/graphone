import Graph from "../../Graph";
import Path from "../../Path";
import { VertexLabelType } from "../../Vertex";
import GraphAlgorithm, { GraphAlgorithmOptions } from "../GraphAlgorithm";

/**
 * The algorithms of this type discover a path between two vertices in a graph.
 */
export default abstract class FindPathGraphAlgorithm extends GraphAlgorithm {

    constructor(graph: Graph, options?: GraphAlgorithmOptions) {
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
