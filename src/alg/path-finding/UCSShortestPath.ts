import Graph from "../../Graph";
import { zeroHeuristicFunction } from "../../heuristics/heuristics";
import Path from "../../Path";
import { VertexLabelType } from "../../Vertex";
import { CollisionResolutionFunc } from "../GraphAlgorithm";
import AStarShortestPath from "./AStarShortestPath";

/**
 * UCS (Uniform Cost Search) algorithm. 
 * It discovers the shortest path in a graph between two vertices using the
 * UCS algorithm.
 */
export default class UCSShortestPath extends AStarShortestPath {

    /**
     * The name of the algorithm.
     */
     public static readonly algorithmName: string = 'UCS shortest path';

    constructor(graph: Graph, collisionRes?: CollisionResolutionFunc) {
        super(graph, zeroHeuristicFunction, collisionRes);
        this.collisionRes = collisionRes;
    }

    /** {@inheritDoc FindPathGraphAlgorithm.findPath} */
    public findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path {
        const path = super.findPath(startLabel, endLabel);
        this.execStats?.setAlgorithmName(UCSShortestPath.algorithmName);
        return path;
    }

}
