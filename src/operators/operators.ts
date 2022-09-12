import DirectedGraph from '../DirectedGraph';
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
