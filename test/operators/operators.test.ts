import DirectedGraph from '../../src/DirectedGraph';
import UndirectedGraph from '../../src/UndirectedGraph';
import { reverse, subgraph, toUndirected, union } from '../../src/operators';

describe('Operators tests', () => {
    it('should return a subgraph of an undirected graph', () => {
        const g = new UndirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C'], ['C', 'D'], ['D', 'E']]);
        const sg = subgraph(g, ['A', 'B', 'C']);
        const expectedSg = new UndirectedGraph();
        expectedSg.addVertices(['A', 'B', 'C'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C']]);
        expect(expectedSg.equals(sg)).toBe(true);
    });

    it('should return a subgraph of a directed graph', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['B', 'A'], ['A', 'C'], ['C', 'D'], ['D', 'E']]);
        const sg = subgraph(g, ['A', 'B', 'C']);
        const expectedSg = new DirectedGraph();
        expectedSg.addVertices(['A', 'B', 'C'])
            .addEdges([['A', 'A'], ['B', 'A'], ['A', 'C']]);
        expect(expectedSg.equals(sg)).toBe(true);
    });

    it('should reverse a directed graph', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['B', 'A'], ['A', 'C'], ['C', 'D'], ['D', 'E']]);
        const rg = reverse(g);
        const expectedRg = new DirectedGraph();
        expectedRg.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['A', 'B'], ['C', 'A'], ['D', 'C'], ['E', 'D']]);
        expect(expectedRg.equals(rg)).toBe(true);
    });

    it('should return the equivalent undirected graph', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C'], ['C', 'D'], ['D', 'E']]);
        const ug = toUndirected(g);
        const expectedUg = new UndirectedGraph();
        expectedUg.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C'], ['C', 'D'], ['D', 'E']]);
        expect(expectedUg.equals(ug)).toBe(true);
    });

    it('should return the union of two graphs', () => {
        const g1 = new DirectedGraph('G1');
        g1.addVertices(['A', 'B', 'C'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C']]);
        const g2 = new DirectedGraph('G2');
        g2.addVertices(['A', 'C', 'D', 'E'])
            .addEdges([['D', 'A'], ['D', 'E'], ['A', 'C', 2]]);
        const ug = union(g1, g2);
        const expectedUg = new DirectedGraph();
        expectedUg.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C', 2], ['D', 'A'], ['D', 'E']]);
        expect(expectedUg.equals(ug)).toBe(true);
    });
});
