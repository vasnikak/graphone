import UndirectedGraph from '../src/UndirectedGraph';

describe('UndirectedGraph tests', () => {
    it('should create an undirected graph with 4 edges', () => {
        const g = new UndirectedGraph();
        g.addVertex('A')
            .addVertex('B')
            .addVertex('C')
            .addEdge('A', 'B')
            .addEdge('A', 'B')
            .addEdge('A', 'D')
            .addEdge('A', 'C');
        expect(g.getEdgesNum()).toBe(4);
    });

    it('should create an undirected graph with 2 edges', () => {
        const g = new UndirectedGraph();
        g.addVertex('A')
            .addVertex('B')
            .addVertex('C')
            .addEdge('A', 'B')
            .addEdge('A', 'C')
            .removeEdge('A', 'B')
            .removeEdge('A', 'D');
        expect(g.getEdgesNum()).toBe(2);
    });
});
