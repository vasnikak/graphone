import { completeDirectedGraph, completeUndirectedGraph } from "../../src/generators";

describe('Generators tests', () => {
    it('should create a complete undirected graph without self-loops', () => {
        const g = completeUndirectedGraph(5);
        expect(g.getEdgesNum()).toBe(10);
    });

    it('should create a complete undirected graph with self-loops', () => {
        const g = completeUndirectedGraph(5, true);
        expect(g.getEdgesNum()).toBe(15);
    });

    it('should create a complete directed graph without self-loops', () => {
        const g = completeDirectedGraph(5);
        expect(g.getEdgesNum()).toBe(20);
    });

    it('should create a complete directed graph with self-loops', () => {
        const g = completeDirectedGraph(5, true);
        expect(g.getEdgesNum()).toBe(25);
    });
});
