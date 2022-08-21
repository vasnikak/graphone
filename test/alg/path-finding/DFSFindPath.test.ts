import DFSFindPath from '../../../src/alg/path-finding/DFSFindPath';
import FindPathAlgorithmExecutionStats from '../../../src/alg/FindPathAlgorithmExecutionStats';
import Vertex from '../../../src/Vertex';
import Maze from '../../Maze';

describe('DFS Find path test', () => {
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
        const dfsFindPath = new DFSFindPath(graph, (a: Vertex, b: Vertex) => { return b.getLabel().localeCompare(a.getLabel() )});
        dfsFindPath.findPath(startNode, endNode);
        const stats = dfsFindPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.getPathLength()).toBe(19);
    });

    it('should not find a solution', () => {
        const startNode = '(0, 0)';
        const endNode = '(0, 9)';
        const dfsFindPath = new DFSFindPath(graph);
        dfsFindPath.findPath(startNode, endNode);
        const stats = dfsFindPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.getNodesVisitedNum()).toBe(79);
    });
});
