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

    it('should create a vertex with 2 incoming edges and 1 outgoing', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D'])
            .addEdges([['A', 'B'], ['A', 'C'], ['A', 'D'], ['B', 'C'], ['C', 'B'], ['D', 'B']])
            .removeEdge('C', 'B');
        const b = g.getVertex('B');
        expect(b?.getInEdgesNum()).toBe(2);
        expect(b?.getOutEdgesNum()).toBe(1);
    });

    it('should remove all edges from the graph', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C'])
            .addEdges([['A', 'B'], ['A', 'B'], ['A', 'D'], ['A', 'C']])
            .clearEdges();
        expect(g.getEdgesNum()).toBe(0);
    });

    it('should count correctly the self loops', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C'], ['B', 'B'], ['B', 'C'], ['C', 'B'], ['C', 'C'], ['D', 'B']])
            .removeEdge('C', 'C');
        expect(g.hasSelfLoops()).toBe(true);
        expect(g.getSelfLoopCount()).toBe(2);
    });

    it('should detect a cycle', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'B'], ['B', 'C'], ['C', 'A'], ['C', 'D'], ['D', 'E']]);
        expect(g.hasCycles()).toBe(true);
    });

    it('should not detect any cycles', () => {
        const g = new DirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D'], ['D', 'E']]);
        expect(g.hasCycles()).toBe(false);
    });
});
