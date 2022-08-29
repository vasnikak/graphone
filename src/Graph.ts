import Path from "./Path"
import Vertex, { VertexLabelType } from "./Vertex"

/**
 * Base class for each graph class.
 * Each graph has a name and a set of vertices.
 */
export default abstract class Graph {

    /**
     * The default name of a graph, in case that is not given.
     */
    public static readonly DEFAULT_GRAPH_NAME = 'Graph';

    /**
     * The name of the graph.
     */
    private name: string;
    /**
     * The set of vertices.
     */
    protected vertices: { [label in VertexLabelType]: Vertex };

    /**
     * Creates a named graph.
     * @param name the name of the graph
     */
    constructor(name?: string) {
        if (!name)
            name = Graph.DEFAULT_GRAPH_NAME;
        this.name = name;
        this.vertices = {};
    }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    /**
     * Returns a list with the vertices of the graph.
     * @returns the list with the vertices
     */
    public getVertices(): Vertex[] {
        const vertices: Vertex[] = [];
        for (let key in this.vertices) {
            if (this.vertices.hasOwnProperty(key))
                vertices.push(this.vertices[key]);
        }
        return vertices;
    }

    /**
     * Returns the number of vertices of the graph.
     * @returns the number of vertices
     */
    public getVerticesNum(): number {
        let verticesNum = 0;
        for (let key in this.vertices) {
            if (this.vertices.hasOwnProperty(key))
                verticesNum++;
        }
        return verticesNum;
    }

    /**
     * Returns the number of edges of the graph.
     * @return the number of edges of the graph
     */
     public abstract getEdgesNum(): number;

    /**
     * Adds a new vertex to the graph.
     * @param label the label of the vertex
     * @param data the data of the vertex
     * @return the current graph
     */
    public addVertex(label: VertexLabelType, data?: any): Graph {
        this.vertices[label] = new Vertex(label, data);
        return this;
    }

    /**
     * Adds one or more vertices to the graph.
     * The labels are provided as an array. Each array item can either be an item
     * of type VertexLabelType, in case that the vertex has no additional data or
     * an array of exactly two items: the label of the vertex and its corresponding data.
     * @param vertexData the labels of the vertices
     * @returns the current graph
     */
    public addVertices(vertexData: (VertexLabelType | [VertexLabelType, any])[]): Graph {
        vertexData.forEach(v => {
            let label: VertexLabelType;
            let data = undefined;
            if (Array.isArray(v)) {
                label = v[0];
                data = v[1];
            } else
                label = v[0];
            this.addVertex(label, data);
        });
        return this;
    }

    /**
     * Checks if the graph contains a vertex with a specific label.
     * @param label the label of the vertex
     * @return true or false
     */
    public hasVertex(label: VertexLabelType): boolean {
        return this.vertices[label] ? true : false;
    }

    /**
     * Updates the data of an existing vertex of the graph. If the vertex doesn't
     * exist, it is added.
     * @param label the label of the vertex
     * @param data the data of the vertex
     * @return the current graph
     */
    public updateVertex(label: VertexLabelType, data?: any): Graph {
        return this.addVertex(label, data);
    }

    /**
     * Returns the corresponding vertex for a specific label.
     * @param label the label of the vertex
     * @returns the corresponding vertex or undefined if the label doesn't exist
     */
    public getVertex(label: VertexLabelType): Vertex | undefined {
        return this.vertices[label];
    }

    /**
     * Returns the corresponding data for a specific label of a vertex
     * @param label the label of the vertex
     * @returns the corresponding data or undefined if the label doesn't exist
     */
    public getVertexData(label: VertexLabelType): any {
        return this.vertices[label] ? this.vertices[label].getData() : undefined;
    }

    /**
     * Returns an array of vertices that corresponds to an array of labels
     * @param labels the labels of the vertices
     * @returns the corresponding vertices of the given labels
     */
    public getVerticesByLabels(labels: VertexLabelType[]): Vertex[] {
        const vertices: Vertex[] = [];
        labels.forEach(label => {
            const vertex = this.getVertex(label);
            if (vertex)
                vertices.push(vertex);
        });
        return vertices;
    }

    /**
     * Checks if two vertices are connected.
     * @param label1 the label of the first vertex
     * @param label2 the label of the second vertex
     * @return true or false according to if the two vertices are connected
     */
    public hasEdge(label1: VertexLabelType, label2: VertexLabelType): boolean {
        const v1 = this.getVertex(label1);
        if (!v1)
            return false;
        const v2 = this.getVertex(label2);
        if (!v2)
            return false;
        return v1.hasOutEdgeWith(v2);
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
     * Adds one or more edges to the graph.
     * The necessary data is provided as an array.
     * Each array item is as well an array, where the first two elements are the origin
     * and destination vertices of the edge and the third element, if present, is the edge's weight.
     * @param edgeData the edges to be added
     * @return the current graph
     */
    public addEdges(edgeData: [VertexLabelType, VertexLabelType, number?][]): Graph {
        edgeData.forEach(e => this.addEdge(e[0], e[1], e[2]));
        return this;
    }

    /**
     * Removes an edge between two vertices.
     * @param label1 the label of the first vertex
     * @param label2 the label of the second vertex
     * @return the current graph
     */
    public abstract removeEdge(label1: VertexLabelType, label2: VertexLabelType): Graph;

    /**
     * Remove one or more edges from the graph.
     * The necessary data is provided as an array.
     * Each array item is as well an array, that contains the origin and destination vertices.
     * @param edgeData the edges to be added
     * @return the current graph
     */
    public removeEdges(edgeData: [VertexLabelType, VertexLabelType][]): Graph {
        edgeData.forEach(e => this.removeEdge(e[0], e[1]));
        return this;
    }

    /**
     * Removes all vertices (and the corresponding edges) from the graph.
     * The graph will remain empty after this action.
     * @return the current graph
     */
    public clear(): Graph {
        this.vertices = {};
        return this;
    }

    /**
     * Removes all edges from the graph.
     * @return the current graph
     */
    public clearEdges(): Graph {
        this.getVertices().forEach(vertex => {
            vertex.getInEdges().forEach(edge => {
                this.removeEdge(edge.getOrigin().getLabel(), edge.getDestination().getLabel());
            });
            vertex.getOutEdges().forEach(edge => {
                this.removeEdge(edge.getOrigin().getLabel(), edge.getDestination().getLabel());
            });
        });
        return this;
    }

    /**
     * Returns a path with the corresponding vertices.
     * @param labels a list with the vertices' labels
     * @returns the corresponding path
     */
    public getPath(labels: VertexLabelType[]): Path {
        const path = new Path();
        for (let label of labels) {
            const vertex = this.getVertex(label);
            if (!vertex)
                return new Path();
            path.add(vertex);
        }
        return path;
    }

    public toString(): string {
        const vertexNum = this.getVerticesNum();
        let str = 'Graph ' + this.name + ' (' + vertexNum + ' vertices)\n\n';
        let vertexCount = 0;
        this.getVertices().forEach(vertex => {
            str += vertex.toString() + '\n';
            vertex.getOutEdges().forEach(edge => {
                str += '   ' + edge.toString() + '\n';
                if (++vertexCount < vertexNum)
                    str += '\n';
            });
        });
        return str;
    }

    public equals(obj: any): boolean {
        if (this === obj)
            return true;
        if (!(obj instanceof Graph))
            return false;
        const graph = obj as Graph;
        if (this.getVerticesNum() !== graph.getVerticesNum())
            return false;
        const vertices = this.getVertices();
        for (let vertex of vertices) {
            const otherVertex = graph.getVertex(vertex.getLabel());
            if (!otherVertex)
                return false;
            if (!vertex.equals(otherVertex))
                return false;
        }
        return true;
    }

}
