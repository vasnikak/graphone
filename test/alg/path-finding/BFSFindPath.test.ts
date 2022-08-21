import FindPathAlgorithmExecutionStats from '../../../src/alg/FindPathAlgorithmExecutionStats';
import BFSFindPath from '../../../src/alg/path-finding/BFSFindPath';
import Maze from '../../Maze';

describe('BFS Find path test', () => {
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
        const startNode = '(0, 0)';
        const endNode = '(9, 9)';
        const bfsFindPath = new BFSFindPath(graph);
        bfsFindPath.findPath(startNode, endNode);
        const stats = bfsFindPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.getPathLength()).toBe(19);
    });

    it('should not find a solution', () => {
        const startNode = '(0, 0)';
        const endNode = '(0, 9)';
        const bfsFindPath = new BFSFindPath(graph);
        bfsFindPath.findPath(startNode, endNode);
        const stats = bfsFindPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.getNodesVisitedNum()).toBe(79);
    });
});
