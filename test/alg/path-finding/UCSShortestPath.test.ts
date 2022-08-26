import { FindPathAlgorithmExecutionStats } from "../../../src/alg/path-finding";
import { UCSShortestPath } from "../../../src/alg/path-finding";
import Maze from "../../Maze";

describe('UCS shortest path test', () => {
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

    it('should find a solution', () => {
        const startNode = '(0,0)';
        const endNode = '(9,9)';
        const ucsShortestPath = new UCSShortestPath(graph);
        ucsShortestPath.findPath(startNode, endNode);
        const stats = ucsShortestPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.wasSolutionFound()).toBe(true);
        expect(stats.getPathLength()).toBe(19);
    });

    it('should not find a solution', () => {
        const startNode = '(0,0)';
        const endNode = '(0,9)';
        const ucsShortestPath = new UCSShortestPath(graph);
        ucsShortestPath.findPath(startNode, endNode);
        const stats = ucsShortestPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.wasSolutionFound()).toBe(false);
        expect(stats.getNodesVisitedNum()).toBe(79);
    });
});
