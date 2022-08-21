import Graph from "../Graph"
import Vertex from "../Vertex"
import AlgorithmExecutionStats from "./AlgorithmExecutionStats"

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
