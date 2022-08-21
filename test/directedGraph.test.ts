import DirectedGraph from '../src/directedGraph'

describe('DirectedGraph tests', () => {
    it('should create a directed graph with 2 edges', () => {
        const g = new DirectedGraph();
        g.addVertex('A')
            .addVertex('B')
            .addVertex('C')
            .addEdge('A', 'B')
            .addEdge('A', 'B')
            .addEdge('A', 'D')
            .addEdge('A', 'C');
        expect(g.getEdgesNum()).toBe(2);
    });

    it('should create a directed graph with 1 edge', () => {
        const g = new DirectedGraph();
        g.addVertex('A')
            .addVertex('B')
            .addVertex('C')
            .addEdge('A', 'B')
            .addEdge('A', 'C')
            .removeEdge('A', 'B')
            .removeEdge('A', 'D');
        expect(g.getEdgesNum()).toBe(1);
    });
});
