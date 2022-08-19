import Vertex, { VertexLabelType } from "./vertex"

/**
 * Base class for each graph class.
 * Each graph has a name and a set of vertices.
 */
export default abstract class Graph {

    /**
     * The default name of a graph, in case that is not given
     */
    public static readonly DEFAULT_GRAPH_NAME = 'Graph'

    /**
     * The name of the graph
     */
    private name: string
    /**
     * The set of vertices
     */
    protected vertices: { [label in VertexLabelType]: Vertex }

    /**
     * Creates a named graph.
     * @param name the name of the graph
     */
    public constructor(name?: string) {
        if (!name)
            name = Graph.DEFAULT_GRAPH_NAME
        this.name = name
        this.vertices = {}
    }

    public getName() {
        return this.name
    }

    public setName(name: string) {
        this.name = name
    }

    /**
     * Returns a list with the vertices of the graph.
     * @returns the list with the vertices
     */
    public getVertices(): Vertex[] {
        const vertices: Vertex[] = []
        for (let key in this.vertices) {
            if (this.vertices.hasOwnProperty(key))
                vertices.push(this.vertices[key])
        }
        return vertices
    }

    /**
     * Adds a new vertex to the graph.
     * @param label the label of the vertex
     * @param data the data of the vertex
     * @return the current graph
     */
    public addVertex(label: VertexLabelType, data?: any) {
        this.vertices[label] = new Vertex(label, data)
    }

    /**
     * Checks if the graph contains a vertex with a specific label.
     * @param label the label of the vertex
     * @return true or false
     */
    public contains(label: VertexLabelType): boolean {
        return this.vertices[label] ? true : false
    }

    /**
     * Returns the corresponding vertex for a specific label.
     * @param label the label of the vertex
     * @returns the corresponding vertex or undefined if the label doesn't exist
     */
    public getVertex(label: VertexLabelType): Vertex | undefined {
        return this.vertices[label]
    }

    /**
     * Checks if two vertices are connected.
     * @param label1 the label of the first vertex
     * @param label2 the label of the second vertex
     * @return true or false according to if the two vertices are connected
     */
    public hasEdge(label1: VertexLabelType, label2: VertexLabelType): boolean {
        const v1 = this.getVertex(label1)
        if (!v1)
            return false
        const v2 = this.getVertex(label2)
        if (!v2)
            return false
        return v1.hasEdgeWith(v2)
    }

    /**
     * Adds an edge between two vertices.
     * @param label1 the label of the first vertex
     * @param label2 the label of the second vertex
     * @param weight the weight of the edge
     * @return the current graph
     */
    public abstract addEdge(label1: VertexLabelType, label2: VertexLabelType, weight?: number): Graph;

    /**
     * Removes an edge between two vertices.
     * @param label1 the label of the first vertex
     * @param label2 the label of the second vertex
     * @return the current graph
     */
    public abstract removeEdge(label1: VertexLabelType, label2: VertexLabelType): Graph;

}
