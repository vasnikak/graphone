import Graph from "../../Graph";
import Vertex, { VertexLabelType } from "../../Vertex";
import GraphAlgorithm, { CollisionResolutionFunc } from "../GraphAlgorithm";

/**
 * The algorithms of this type traverse all nodes of a graph.
 */
export default abstract class TraversalGraphAlgorithm extends GraphAlgorithm {

    /**
     * Collision resolution function.
     */
    protected collisionRes: CollisionResolutionFunc | undefined;

    public constructor(graph: Graph, collisionRes?: CollisionResolutionFunc) {
        super(graph);
        this.collisionRes = collisionRes;
    }

    /**
     * The action that will be executed on each vertex of the graph during the traversal.
     * In case that the function returns false, the traversal will stop.
     * @param startLabel the label of the starting vertex
     * @param traverseAction the action that will executed on each vertex during the traversal
     */
    public abstract traverse(startLabel: VertexLabelType, traverseAction: (vertex: Vertex) => any): void;

}
