import Graph from "../../Graph";
import Vertex from "../../Vertex";
import GraphAlgorithm from "../GraphAlgorithm";

/**
 * The algorithms of this type traverse all nodes of a graph.
 */
export default abstract class TraversalGraphAlgorithm extends GraphAlgorithm {

    public constructor(graph: Graph) {
        super(graph);
    }

    /**
     * The action that will be executed on each vertex of the graph during the traversal.
     * In case that the function returns false, the traversal will stop.
     * @param traverseAction the action that will executed on each vertex during the traversal
     */
    public abstract traverse(traverseAction: (vertex: Vertex) => any): void;

}
