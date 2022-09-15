import { RandomWalkTraversal } from '../../../src/alg/traversal';
import UndirectedGraph from '../../../src/UndirectedGraph';
import Vertex from '../../../src/Vertex';

describe('Random Walk traversal test', () => {

    it('should visit 50 vertices', () => {
        const graph = new UndirectedGraph();
        graph.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C'], ['C', 'D'], ['D', 'E']]);
        const randomWalkTraversal = new RandomWalkTraversal(graph, {}, 50);
        randomWalkTraversal.traverse('A', (v: Vertex) => {});
        const stats = randomWalkTraversal.getExecStats();
        expect(stats?.getVerticesVisitedNum()).toBe(50);
    });
});
