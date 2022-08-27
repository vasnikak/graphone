import Graph from "../Graph"
import AlgorithmExecutionStats from "./AlgorithmExecutionStats"

/**
 * The type of a collision resolution function.
 * The collision resolution function will be executed on the data of a vertex
 * and it has to return a negative (a < b), 0 (a = b) or positive number (a > b), according to the
 * result of the comparison between the two arguments.
 */
 export type CollisionResolutionFunc = (a: any, b: any) => number;

 /**
  * The options for each graph algorithms.
  */
 export interface GraphAlgorithmOptions {
     /** The collision resolution function. */
     collisionRes?: CollisionResolutionFunc;
 };

/**
 * The base class for all graph algorithms.
 */
export default abstract class GraphAlgorithm {

    /**
     * The name of the algorithm.
     */
    public static readonly algorithmName: string;

    /**
     * The graph that the algorithm will be executed on.
     */
    protected graph: Graph;
    /**
     * The options of the graph algorithm.
     */
    protected options: GraphAlgorithmOptions;
    /**
     * Algorithm execution statistics.
     */
    protected execStats: AlgorithmExecutionStats | undefined;

    public constructor(graph: Graph, options?: GraphAlgorithmOptions) {
        this.graph = graph;
        this.options = options ? options : {};
    }

    public getExecStats() {
        return this.execStats;
    }

    public getOptions() {
        return this.options;
    }

}
