import DirectedGraph from '../../src/DirectedGraph';
import UndirectedGraph from '../../src/UndirectedGraph';
import { reverse, subgraph } from '../../src/operators';

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
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C'], ['C', 'D'], ['D', 'E']]);
        const sg = subgraph(g, ['A', 'B', 'C']);
        const expectedSg = new DirectedGraph();
        expectedSg.addVertices(['A', 'B', 'C'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C']]);
        expect(expectedSg.equals(sg)).toBe(true);
    });

    it('should reverse a directed graph', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C'], ['C', 'D'], ['D', 'E']]);
        const rg = reverse(g);
        const expectedRg = new DirectedGraph();
        expectedRg.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'A'], ['B', 'A'], ['C', 'A'], ['D', 'C'], ['E', 'D']]);
        expect(expectedRg.equals(rg)).toBe(true);
    });
});
