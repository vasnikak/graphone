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

    constructor(graph: Graph, collisionRes?: CollisionResolutionFunc) {
        super(graph, zeroHeuristicFunction, collisionRes);
        this.collisionRes = collisionRes;
    }

    /**
     * Finds a path between two nodes in a graph using the DFS algorithm.
     * @param startLabel the label of the starting vertex
     * @param endLabel the label of the destination vertex
     * @return the shortest path from start to end
     */
     public findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path {
        const path = super.findPath(startLabel, endLabel);
        this.execStats?.setAlgorithmName('UCS shortest path');
        return path;
    }

}
