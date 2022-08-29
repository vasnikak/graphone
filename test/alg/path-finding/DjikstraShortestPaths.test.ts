import { DirectedGraph, DjikstraShortestPaths, Path, VertexLabelType } from "../../../src";

describe('Djikstra shortest paths test', () => {
    it('should find the shortest paths', () => {
        const graph = new DirectedGraph();
        graph.addVertices(["A", "B", "C", "D", "E", "F"]);
        graph.addEdge("A", "B", 4)
             .addEdge("A", "C", 2)
             .addEdge("B", "C", 3)
             .addEdge("B", "D", 2)
             .addEdge("B", "E", 3)
             .addEdge("C", "B", 1)
             .addEdge("C", "D", 4)
             .addEdge("C", "E", 5)
             .addEdge("E", "D", 1);

        const dij = new DjikstraShortestPaths(graph);
        const paths = dij.findShortestPaths("A");

        const correctPaths = new Map<VertexLabelType, Path>();
        correctPaths.set("A", new Path(graph.getVerticesByLabels(["A"])));
        correctPaths.set("B", new Path(graph.getVerticesByLabels(["A", "C", "B"])));
        correctPaths.set("C", new Path(graph.getVerticesByLabels(["A", "C"])));
        correctPaths.set("D", new Path(graph.getVerticesByLabels(["A", "C", "B", "D"])));
        correctPaths.set("E", new Path(graph.getVerticesByLabels(["A", "C", "B", "E"])));
        correctPaths.set("F", new Path(graph.getVerticesByLabels([])));

        expect(paths.size).toBe(correctPaths.size);
        for (const [vertexLabel, path] of paths.entries()) {
            const correctPath = correctPaths.get(vertexLabel);
            if (!correctPath || !path.equals(correctPath))
                fail('Path to destination vertex ' + vertexLabel + ' is not correct');
        }
    });
});
