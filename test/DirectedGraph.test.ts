import DirectedGraph from '../src/DirectedGraph';

describe('DirectedGraph tests', () => {
    it('should create a directed graph with 2 edges', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C'])
            .addEdges([['A', 'B'], ['A', 'B'], ['A', 'D'], ['A', 'C']]);
        expect(g.getEdgesNum()).toBe(2);
    });

    it('should create a directed graph with 1 edge', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C'])
            .addEdges([['A', 'B'], ['A', 'C']])
            .removeEdges([['A', 'B'], ['A', 'D']]);
        expect(g.getEdgesNum()).toBe(1);
    });

    it ('should create a vertex with 2 incoming edges and 1 outgoing', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D'])
            .addEdges([['A', 'B'], ['A', 'C'], ['A', 'D'], ['B', 'C'], ['C', 'B'], ['D', 'B']])
            .removeEdge('C', 'B');
        const b = g.getVertex('B');
        expect(b?.getInEdgesNum()).toBe(2);
        expect(b?.getOutEdgesNum()).toBe(1);
    });
});
