import { AStarShortestPath } from "../../../src/alg/path-finding";
import { FindPathAlgorithmExecutionStats } from "../../../src/alg/path-finding";
import Maze, { MazeCell } from "../../Maze";

describe('A* shortest path test', () => {
    const maze = new Maze([
        [0,0,0,0,0,0,0,0,0,1],
        [0,1,1,0,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,1,0,0,0],
        [0,0,1,0,0,0,0,0,0,1],
        [0,0,1,0,0,1,0,0,0,0],
        [0,0,0,0,1,0,0,0,1,1],
        [1,1,0,0,1,0,1,1,0,0],
        [0,0,0,0,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0]
    ]);
    const graph = maze.generateGraph();
    const manhattanDistanceFunc = (endNodeX: number, endNodeY: number) => {
        return (cellData: MazeCell) => {
            return Math.abs(cellData.x - endNodeX) + Math.abs(cellData.x - endNodeY);
        };
    };

    it('should find a solution', () => {
        const startNode = '(0,0)';
        const endNodeX = 9, endNodeY = 9;
        const endNode = '(' + endNodeX + ',' + endNodeY + ')';
        const heuristicFunc = manhattanDistanceFunc(endNodeX, endNodeY);
        const aStarShortestPath = new AStarShortestPath(graph, heuristicFunc);
        aStarShortestPath.findPath(startNode, endNode);
        const stats = aStarShortestPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.wasSolutionFound()).toBe(true);
        expect(stats.getPathLength()).toBe(19);
    });

    it('should not find a solution', () => {
        const startNode = '(0,0)';
        const endNodeX = 0, endNodeY = 9;
        const endNode = '(' + endNodeX + ',' + endNodeY + ')';
        const heuristicFunc = manhattanDistanceFunc(endNodeX, endNodeY);
        const aStarShortestPath = new AStarShortestPath(graph, heuristicFunc);
        aStarShortestPath.findPath(startNode, endNode);
        const stats = aStarShortestPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.wasSolutionFound()).toBe(false);
        expect(stats.getNodesVisitedNum()).toBe(79);
    });
});
