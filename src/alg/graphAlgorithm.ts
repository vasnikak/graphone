import Graph from "../graph"
import Vertex from "../vertex"
import AlgorithmExecutionStats from "./algorithmExecutionStats"

/**
 * The base class for all graph algorithms.
 */
export default abstract class GraphAlgorithm {

    protected graph: Graph;
    /**
     * Algorithm execution statistics
     */
    protected execStats: AlgorithmExecutionStats | undefined

    public constructor(graph: Graph) {
        this.graph = graph;
    }

    public getExecStats() {
        return this.execStats;
    }

}

export type CollisionResolutionFunc = (a: Vertex, b: Vertex) => number;
