import UndirectedGraph from "../src/UndirectedGraph";

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
});
