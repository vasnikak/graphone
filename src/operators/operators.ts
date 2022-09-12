import DirectedGraph from '../DirectedGraph';
import Edge from '../Edge';
import Graph from '../Graph';
import UndirectedGraph from '../UndirectedGraph';
import Vertex, { VertexLabelType } from '../Vertex';

/**
 * Constructs a subgraph of an already existing graph.
 * @param graph the origin graph
 * @param filteredVertices a list of the vertex labels that the subgraph will contain or a filter function
 * @returns the subgraph
 */
export const subgraph = (graph: Graph, filteredVertices: VertexLabelType[] | ((v: Vertex) => boolean)): Graph => {
    let newGraph: Graph;
    if (graph instanceof DirectedGraph)
        newGraph = new DirectedGraph(graph.getName());
    else
        newGraph = new UndirectedGraph(graph.getName());

    let newVertices: Vertex[];
    if (Array.isArray(filteredVertices))
        newVertices = graph.getVerticesByLabels(filteredVertices);
    else
        newVertices = graph.getVertices().filter(vertex => (filteredVertices as ((v: Vertex) => boolean))(vertex));

    for (let i = 0; i < newVertices.length; i++)
        newGraph.addVertex(newVertices[i].getLabel(), newVertices[i].getData());

    for (let i = 0; i < newVertices.length; i++) {
        for (let j = 0; j < newVertices.length; j++) {
            const edge = graph.getEdge(newVertices[i], newVertices[j]);
            if (edge)
                newGraph.addEdge(newVertices[i].getLabel(), newVertices[j].getLabel(), edge.getWeight());
        }
    }    

    return newGraph;
};

/**
 * Constructs a directed graph that has the same vertices but the reversed edges
 * of the original graph.
 * @param graph the original graph
 * @returns the reversed graph
 */
 export const reverse = (graph: DirectedGraph): DirectedGraph => {
    const reversedGraph = new DirectedGraph(graph.getName());
    
    const vertices = graph.getVertices();
    vertices.forEach(v => {
        reversedGraph.addVertex(v.getLabel(), v.getData());
    });

    for (let i = 0; i < vertices.length; i++) {
        for (let j = 0; j < vertices.length; j++) {
            const edge = graph.getEdge(vertices[i], vertices[j]);
            if (edge)
                reversedGraph.addEdge(vertices[j].getLabel(), vertices[i].getLabel(), edge.getWeight());
        }
    }

    return reversedGraph;
};

/**
 * Returns the undirected version of a directed graph.
 * @param graph the original directed graph
 * @returns the undirected version of the directed graph
 */
export const toUndirected = (graph: DirectedGraph): UndirectedGraph => {
    const uGraph = new UndirectedGraph(graph.getName());

    const vertices = graph.getVertices();
    vertices.forEach(v => {
        uGraph.addVertex(v.getLabel(), v.getData());
    });

    for (let i = 0; i < vertices.length; i++) {
        for (let j = 0; j < vertices.length; j++) {
            const edge = graph.getEdge(vertices[i], vertices[j]);
            if (edge)
                uGraph.addEdge(vertices[i].getLabel(), vertices[j].getLabel(), edge.getWeight());
        }
    }

    return uGraph;
};

/**
 * Returns the union of two graphs.
 * If at least one of the graph is undirected, an undirected graph is returned.
 * If both graphs are directed, a directed graph is returned.
 * The union contains all vertices and edges of the two graph, with precedence given
 * to the second graph.
 * @param g1 the first graph
 * @param g2 the second graph
 * @returns the union of the two graphs
 */
export const union = (g1: Graph, g2: Graph): Graph => {
    let uGraph: Graph;
    if (g1 instanceof UndirectedGraph || g2 instanceof UndirectedGraph)
        uGraph = new UndirectedGraph(g1.getName() + ' UNION ' + g2.getName());
    else
        uGraph = new DirectedGraph(g1.getName() + ' UNION ' + g2.getName());

    const verticesMap = new Map<VertexLabelType, Vertex>();
    g1.forEachVertex(v => verticesMap.set(v.getLabel(), v));
    g2.forEachVertex(v => verticesMap.set(v.getLabel(), v));
    const vertices: Vertex[] = [];
    for (let v of verticesMap.values()) {
        uGraph.addVertex(v.getLabel(), v.getData());
        vertices.push(v);
    }

    for (let i = 0; i < vertices.length; i++) {
        for (let j = 0; j < vertices.length; j++) {
            let edge: Edge | undefined;
            edge = g2.getEdge(vertices[i].getLabel(), vertices[j].getLabel());
            if (!edge)
                edge = g1.getEdge(vertices[i].getLabel(), vertices[j].getLabel());
            if (edge)
                uGraph.addEdge(vertices[i].getLabel(), vertices[j].getLabel(), edge.getWeight());
        }
    }
    
    return uGraph;
};
