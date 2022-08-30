import UndirectedGraph from '../src/UndirectedGraph';

describe('UndirectedGraph tests', () => {
    it('should create an undirected graph with 3 edges', () => {
        const g = new UndirectedGraph();
        g.addVertices(['A', 'B', 'C'])
            .addEdge('A', 'B')
            .addEdge('A', 'B')
            .addEdge('A', 'D')
            .addEdge('A', 'C');
        expect(g.getEdgesNum()).toBe(2);
    });

    it('should create an undirected graph with 1 edge', () => {
        const g = new UndirectedGraph();
        g.addVertices(['A', 'B', 'C'])
            .addEdges([['A', 'B'], ['A', 'C']])
            .removeEdges([['A', 'B'], ['A', 'D']]);
        expect(g.getEdgesNum()).toBe(1);
    });

    it ('should remove all edges from the graph', () => {
        const g = new UndirectedGraph();
        g.addVertices(['A', 'B', 'C'])
            .addEdges([['A', 'B'], ['A', 'B'], ['A', 'D'], ['A', 'C']])
            .clearEdges();
        expect(g.getEdgesNum()).toBe(0);
    });

    it ('should count correctly the self loops', () => {
        const g = new UndirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D'])
            .addEdges([['A', 'A'], ['A', 'B'], ['A', 'C'], ['B', 'B'], ['B', 'C'], ['C', 'B'], ['C', 'C'], ['D', 'B']])
            .removeEdge('C', 'C');
        expect(g.hasSelfLoops()).toBe(true);
        expect(g.getSelfLoopCount()).toBe(2);
    });

    it('should detect a cycle', () => {
        const g = new UndirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D'], ['D', 'E']]);
        expect(g.hasCycles()).toBe(true);
    });

    it('should not detect any cycles', () => {
        const g = new UndirectedGraph();
        g.addVertices(['A', 'B', 'C', 'D', 'E'])
            .addEdges([['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E']]);
        expect(g.hasCycles()).toBe(false);
    });
});
