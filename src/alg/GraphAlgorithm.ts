import Graph from "../Graph"
import Vertex from "../Vertex"
import AlgorithmExecutionStats from "./AlgorithmExecutionStats"

/**
 * The base class for all graph algorithms.
 */
export default abstract class GraphAlgorithm {

    /**
     * The graph that the algorithm will be executed on.
     */
    protected graph: Graph;
    /**
     * Algorithm execution statistics.
     */
    protected execStats: AlgorithmExecutionStats | undefined

    public constructor(graph: Graph) {
        this.graph = graph;
    }

    public getExecStats() {
        return this.execStats;
    }

}

/**
 * The type of a collision resolution function.
 * The collision resolution function will be executed on the data of a vertex
 * and it has to return a negative (a < b), 0 (a = b) or positive number (a > b), according to the
 * result of the comparison between the two arguments.
 */
export type CollisionResolutionFunc = (a: any, b: any) => number;
