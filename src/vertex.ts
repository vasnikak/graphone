import Edge from './edge'

/**
 * The label of a node is a string.
 * Strict type checking will be applied in all operations.
 */
export type VertexLabelType = string

/**
 * The vertex of a graph.
 * Each vertex contains a set with all the outgoing edges.
 */
export default class Vertex {
    
    /**
     * The label of the vertex
     */
    private label: VertexLabelType;
    /**
     * The data that the vertex contains
     */
    private data: any;
    /**
     * The outgoing edges of the vertex
     */
    private edges: { [label in VertexLabelType | number]: Edge };

    public constructor(label: VertexLabelType, data?: any) {
        this.label = label;
        this.data = data;
        this.edges = {};
    }

    public getLabel() {
        return this.label;
    }

    public getData() {
        return this.data;
    }

    /**
     * Returns a list with all the outgoing edges of the vertex.
     * @returns a list with all the outgoing edges of the vertex
     */
    public getEdges(): Edge[] {
        const edges: Edge[] = [];
        for (let key in this.edges) {
            if (this.edges.hasOwnProperty(key))
                edges.push(this.edges[key]);
        }
        return edges;
    }

    /**
     * Returns the number of the outgoing edges of the vertex.
     * @returns the number of the outgoing edges of the vertex
     */
    public getEdgesNum(): number {
        let edgesNum = 0;
        for (let key in this.edges) {
            if (this.edges.hasOwnProperty(key))
                edgesNum++;
        }
        return edgesNum;
    }

    /**
     * Adds an edge to the current vertex's set of outgoing edges.
     * @param edge the edge to be added
     * @returns the current vertex
     */
    public addEdge(edge: Edge): Vertex {
        this.edges[edge.getVertex().getLabel()] = edge;
        return this;
    }

    /**
     * Adds an outgoing edge with a vertex.
     * @param vertex the vertex to be connected with
     * @param weight the weight of the edge
     * @returns the current vertex
     */
    public addEdgeWith(vertex: Vertex, weight?: number): Vertex {
        this.edges[vertex.getLabel()] = new Edge(vertex, weight);
        return this;
    }

    /**
     * Removes an edge from the current vertex's set of outgoing edges.
     * @param edge the edge to be removed
     * @returns the current vertex
     */
    public removeEdge(edge: Edge): Vertex {
        delete this.edges[edge.getVertex().getLabel()];
        return this;
    }

    /**
     * Removes an outgoing edge with a vertex.
     * @param vertex the vertex
     * @returns the current vertex
     */
    public removeEdgeWith(vertex: Vertex): Vertex {
        delete this.edges[vertex.getLabel()];
        return this;
    }

    /**
     * Checks if the current vertex has a specific edge.
     * @param edge the edge
     * @return true or false
     */
    public hasEdge(edge: Edge): boolean {
        return (edge.getVertex().getLabel() in this.edges);
    }

    /**
     * Checks if the current vertex has an edge with another vertex.
     * @param vertex the vertex that needs to be checked
     * @return true or false
     */
    public hasEdgeWith(vertex: Vertex): boolean {
        return (vertex.getLabel() in this.edges);
    }

    /**
     * Returns the edge of the current vertex with another (destination) vertex.
     * @param vertex the destination vertex
     * @returns the corresponding edge of undefined if it doesn't exist
     */
    public getEdgeWith(vertex: Vertex): Edge | undefined {
        return this.edges[vertex.getLabel()];
    }

    /**
     * Returns an array with the neighbor vertices.
     * @return the neighbor vertices
     */
    public getNeighbors(): Vertex[] {
        const neighbors: Vertex[] = [];
        for (let key in this.edges) {
            if (this.edges.hasOwnProperty(key))
                neighbors.push(this.edges[key].getVertex());
        }
        return neighbors;
    }

    /**
     * Returns the number of neighbor vertices.
     * @return the number of neighbor vertices
     */
    public getNeighborsNum(): number {
        let neighborsNum = 0;
        for (let key in this.edges) {
            if (this.edges.hasOwnProperty(key))
                neighborsNum++;
        }
        return neighborsNum;
    }

    public toString(): string {
        return 'Vertex[' + this.label + ']';
    }

    public equals(obj: any): boolean {
        if (this === obj)
            return true;
        if (!(obj instanceof Vertex))
            return false;
        const vertex = obj as Vertex;
        if (this.label !== vertex.label)
            return false;
        if (this.getEdgesNum() !== vertex.getEdgesNum())
            return false;
        const edges = this.getEdges();
        for (let edge of edges) {
            if (!vertex.edges[edge.getVertex().getLabel()])
                return false;
        }
        return true;
    }

}
