import DirectedGraph from "../DirectedGraph";
import Graph from "../Graph";
import UndirectedGraph from "../UndirectedGraph";

enum GraphType {
    UndirectedGraph,
    DirectedGraph
};

/**
 * Helper method, that constructs and returns a complete graph.
 * @param graphType the graph type
 * @param verticesNum the number of vertices
 * @param includeSelfLoops true in case self loops would be included
 * @returns the complete graph
 */
const complete = (graphType: GraphType, verticesNum: number, includeSelfLoops: boolean = false): Graph => {
    let graph: Graph;
    if (graphType === GraphType.UndirectedGraph)
        graph = new UndirectedGraph();
    else
        graph = new DirectedGraph();
    
    for (let i = 1; i <= verticesNum; i++)
        graph.addVertex('' + i);

    if (graph instanceof UndirectedGraph) {
        for (let i = 1; i <= verticesNum; i++) {
            for (let j = i; j <= verticesNum; j++) {
                if (i === j && !includeSelfLoops)
                    continue;
                graph.addEdge('' + i, '' + j);
            }
        }
    } else {
        for (let i = 1; i <= verticesNum; i++) {
            for (let j = 1; j <= verticesNum; j++) {
                if (i === j && !includeSelfLoops)
                    continue;
                graph.addEdge('' + i, '' + j);
            }
        }
    }

    return graph;
};

/**
 * Constructs and returns a complete undirected graph.
 * @param graphType the graph type
 * @param verticesNum the number of vertices
 * @param includeSelfLoops true in case self loops would be included
 * @returns the complete undirected graph
 */
export const completeUndirectedGraph = (verticesNum: number, includeSelfLoops: boolean = false): UndirectedGraph => {
    return complete(GraphType.UndirectedGraph, verticesNum, includeSelfLoops) as UndirectedGraph;
};

/**
 * Constructs and returns a complete directed graph.
 * @param graphType the graph type
 * @param verticesNum the number of vertices
 * @param includeSelfLoops true in case self loops would be included
 * @returns the complete directed graph
 */
export const completeDirectedGraph = (verticesNum: number, includeSelfLoops: boolean = false): DirectedGraph => {
    return complete(GraphType.DirectedGraph, verticesNum, includeSelfLoops) as DirectedGraph;
};
