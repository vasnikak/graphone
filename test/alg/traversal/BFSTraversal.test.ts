import { BFSTraversal } from "../../../src/alg/traversal";
import Maze, { MazeCell } from "../../Maze";
import Vertex from "../../../src/Vertex";

describe('BFS traversal test', () => {
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

    it('should traverse the whole graph using BFS', () => {
        const startLabel = '(0,0)';
        const bfsTraversal = new BFSTraversal(graph, { collisionRes: (a: MazeCell, b: MazeCell) => (a.x !== b.x) ? b.x - a.x : b.y - a.y });
        bfsTraversal.traverse(startLabel, (v: Vertex) => { });
        const stats = bfsTraversal.getExecStats();
        expect(stats?.getVerticesVisitedNum()).toBe(79);
    });

    it('should traverse partially graph using BFS', () => {
        const startLabel = '(0,0)';
        const bfsTraversal = new BFSTraversal(graph, { collisionRes: (a: MazeCell, b: MazeCell) => (a.x !== b.x) ? b.x - a.x : b.y - a.y });
        bfsTraversal.traverse(startLabel, (v: Vertex) => { return !(v.getLabel() === '(5,6)'); });
        const stats = bfsTraversal.getExecStats();
        expect(stats?.getVerticesVisitedNum()).toBe(50);
    });
});
