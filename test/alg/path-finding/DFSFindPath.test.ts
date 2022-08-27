import { DFSFindPath } from "../../../src/alg/path-finding/";
import { FindPathAlgorithmExecutionStats } from "../../../src/alg/path-finding";
import Maze, { MazeCell } from "../../Maze";

describe('DFS find path test', () => {
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
        const dfsFindPath = new DFSFindPath(graph, { collisionRes: (a: MazeCell, b: MazeCell) => (a.x !== b.x) ? b.x - a.x : b.y - a.y });
        dfsFindPath.findPath(startNode, endNode);
        const stats = dfsFindPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.wasSolutionFound()).toBe(true);
        expect(stats.getPathLength()).toBe(19);
    });

    it('should not find a solution', () => {
        const startNode = '(0,0)';
        const endNode = '(0,9)';
        const dfsFindPath = new DFSFindPath(graph);
        dfsFindPath.findPath(startNode, endNode);
        const stats = dfsFindPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.wasSolutionFound()).toBe(false);
        expect(stats.getNodesVisitedNum()).toBe(79);
    });
});
