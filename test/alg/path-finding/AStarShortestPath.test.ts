import { AStarShortestPath } from '../../../src/alg/path-finding';
import { FindPathAlgorithmExecutionStats } from '../../../src/alg/path-finding';
import Maze, { MazeCell } from '../../Maze';

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
    const manhattanDistanceFunc = (targetX: number, targetY: number) => {
        return (cellData: MazeCell) => {
            return Math.abs(cellData.x - targetX) + Math.abs(cellData.y - targetY);
        };
    };

    it('should find a solution', () => {
        const startLabel = '(0,0)';
        const endX = 9, endY = 9;
        const endLabel = '(' + endX + ',' + endY + ')';
        const heuristicFunc = manhattanDistanceFunc(endX, endY);
        const aStarShortestPath = new AStarShortestPath(graph, { heuristicFunc });
        aStarShortestPath.findPath(startLabel, endLabel);
        const stats = aStarShortestPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.wasSolutionFound()).toBe(true);
        expect(stats.getPathLength()).toBe(19);
    });

    it('should not find a solution', () => {
        const startLabel = '(0,0)';
        const endX = 0, endY = 9;
        const endLabel = '(' + endX + ',' + endY + ')';
        const heuristicFunc = manhattanDistanceFunc(endX, endY);
        const aStarShortestPath = new AStarShortestPath(graph, { heuristicFunc });
        aStarShortestPath.findPath(startLabel, endLabel);
        const stats = aStarShortestPath.getExecStats() as FindPathAlgorithmExecutionStats;
        expect(stats.wasSolutionFound()).toBe(false);
        expect(stats.getVerticesVisitedNum()).toBe(79);
    });
});
