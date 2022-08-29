import { DFSTraversal } from "../../../src/alg/traversal";
import Maze, { MazeCell } from "../../Maze";
import Vertex from "../../../src/Vertex";

describe('DFS traversal test', () => {
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

    it('should traverse the whole graph using DFS', () => {
        const startLabel = '(0,0)';
        const dfsTraversal = new DFSTraversal(graph, { collisionRes: (a: MazeCell, b: MazeCell) => (a.x !== b.x) ? b.x - a.x : b.y - a.y });
        dfsTraversal.traverse(startLabel, (v: Vertex) => { });
        const stats = dfsTraversal.getExecStats();
        expect(stats?.getVerticesVisitedNum()).toBe(79);
    });

    it('should traverse partially graph using DFS', () => {
        const startLabel = '(0,0)';
        const dfsTraversal = new DFSTraversal(graph, { collisionRes: (a: MazeCell, b: MazeCell) => (a.x !== b.x) ? b.x - a.x : b.y - a.y });
        dfsTraversal.traverse(startLabel, (v: Vertex) => { return !(v.getLabel() === '(1,9)'); });
        const stats = dfsTraversal.getExecStats();
        expect(stats?.getVerticesVisitedNum()).toBe(50);
    });
});
