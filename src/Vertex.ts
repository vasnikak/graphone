import Edge from "./Edge";

/**
 * The key of a node is a string.
 * Strict type checking will be applied in all operations.
 */
export type VertexLabelType = string;

/**
 * The vertex of a graph.
 * Each vertex contains a set with all the incoming and outgoing edges.
 */
export default class Vertex {
    
    /**
     * The label of the vertex.
     */
    private label: VertexLabelType;
    /**
     * The data that the vertex contains.
     */
    private data: any;
    /**
     * The incoming edges of the vertex.
     */
    private inEdges: { [label in VertexLabelType]: Edge };
    /**
     * The outgoing edges of the vertex.
     */
    private outEdges: { [label in VertexLabelType]: Edge };

    constructor(label: VertexLabelType, data?: any) {
        this.label = label;
        this.data = data;
        this.inEdges = {};
        this.outEdges = {};
    }

    public getLabel() {
        return this.label;
    }

    public getData() {
        return this.data;
    }

    /**
     * Returns a list with all the incoming edges of the vertex.
     * @returns a list with all the incoming edges of the vertex
     */
     public getInEdges(): Edge[] {
        const edges: Edge[] = [];
        for (let key in this.inEdges) {
            if (this.inEdges.hasOwnProperty(key))
                edges.push(this.inEdges[key]);
        }
        return edges;
    }

    /**
     * Returns the number of the incoming edges of the vertex.
     * @returns the number of the incoming edges of the vertex
     */
     public getInEdgesNum(): number {
        let edgesNum = 0;
        for (let key in this.inEdges) {
            if (this.inEdges.hasOwnProperty(key))
                edgesNum++;
        }
        return edgesNum;
    }

    /**
     * Adds an edge to the current vertex's set of incoming edges.
     * @param edge the edge to be added
     * @returns the current vertex
     */
     public addInEdge(edge: Edge): Vertex {
        this.inEdges[edge.getOrigin().getLabel()] = edge;
        return this;
    }

    /**
     * Adds an incoming edge with a vertex.
     * @param vertex the vertex to be connected with an outgoing edge.
     * @param weight the weight of the edge
     * @returns the current vertex
     */
    public addInEdgeWith(vertex: Vertex, weight?: number): Vertex {
        this.inEdges[vertex.getLabel()] = new Edge(vertex, this, weight);
        return this;
    }

    /**
     * Removes an edge from the current vertex's set of incoming edges.
     * @param edge the incoming edge to be removed
     * @returns the current vertex
     */
     public removeInEdge(edge: Edge): Vertex {
        delete this.inEdges[edge.getOrigin().getLabel()];
        return this;
    }

    /**
     * Removes an incoming edge with a vertex.
     * @param vertex the vertex
     * @returns the current vertex
     */
    public removeInEdgeWith(vertex: Vertex): Vertex {
        delete this.inEdges[vertex.getLabel()];
        return this;
    }

    /**
     * Checks if the current vertex has a specific incoming edge.
     * @param edge the edge
     * @return true or false
     */
     public hasInEdge(edge: Edge): boolean {
        return this.inEdges[edge.getOrigin().getLabel()] ? true : false;
    }

    /**
     * Checks if the current vertex has an incoming edge with another vertex.
     * @param vertex the vertex that needs to be checked
     * @return true or false
     */
    public hasInEdgeWith(vertex: Vertex): boolean {
        return this.inEdges[vertex.getLabel()] ? true : false;
    }

    /**
     * Returns an array with the neighbor vertices of all incoming edges.
     * @return the neighbor vertices of all incoming edges.
     */
     public getInNeighbors(): Vertex[] {
        const neighbors: Vertex[] = [];
        for (let key in this.inEdges) {
            if (this.inEdges.hasOwnProperty(key))
                neighbors.push(this.inEdges[key].getOrigin());
        }
        return neighbors;
    }

    /**
     * Returns the number of neighbor vertices of all incoming edges.
     * @return the number of neighbor vertices of all incoming edges.
     */
    public getInNeighborsNum(): number {
        let neighborsNum = 0;
        for (let key in this.inEdges) {
            if (this.inEdges.hasOwnProperty(key))
                neighborsNum++;
        }
        return neighborsNum;
    }

    /**
     * Returns a list with all the outgoing edges of the vertex.
     * @returns a list with all the outgoing edges of the vertex
     */
    public getOutEdges(): Edge[] {
        const edges: Edge[] = [];
        for (let key in this.outEdges) {
            if (this.outEdges.hasOwnProperty(key))
                edges.push(this.outEdges[key]);
        }
        return edges;
    }

    /**
     * Returns the number of the outgoing edges of the vertex.
     * @returns the number of the outgoing edges of the vertex
     */
    public getOutEdgesNum(): number {
        let edgesNum = 0;
        for (let key in this.outEdges) {
            if (this.outEdges.hasOwnProperty(key))
                edgesNum++;
        }
        return edgesNum;
    }

    /**
     * Adds an edge to the current vertex's set of outgoing edges.
     * @param edge the edge to be added
     * @returns the current vertex
     */
    public addOutEdge(edge: Edge): Vertex {
        this.outEdges[edge.getDestination().getLabel()] = edge;
        return this;
    }

    /**
     * Adds an outgoing edge with a vertex.
     * @param vertex the vertex to be connected with an outgoing edge.
     * @param weight the weight of the edge
     * @returns the current vertex
     */
    public addOutEdgeWith(vertex: Vertex, weight?: number): Vertex {
        this.outEdges[vertex.getLabel()] = new Edge(this, vertex, weight);
        return this;
    }

    /**
     * Removes an edge from the current vertex's set of outgoing edges.
     * @param edge the outgoing edge to be removed
     * @returns the current vertex
     */
    public removeOutEdge(edge: Edge): Vertex {
        delete this.outEdges[edge.getDestination().getLabel()];
        return this;
    }

    /**
     * Removes an outgoing edge with a vertex.
     * @param vertex the vertex
     * @returns the current vertex
     */
    public removeOutEdgeWith(vertex: Vertex): Vertex {
        delete this.outEdges[vertex.getLabel()];
        return this;
    }

    /**
     * Checks if the current vertex has a specific outdoing edge.
     * @param edge the edge
     * @return true or false
     */
    public hasOutEdge(edge: Edge): boolean {
        return this.outEdges[edge.getDestination().getLabel()] ? true : false;
    }

    /**
     * Checks if the current vertex has an outgoing edge with another vertex.
     * @param vertex the vertex that needs to be checked
     * @return true or false
     */
    public hasOutEdgeWith(vertex: Vertex): boolean {
        return this.outEdges[vertex.getLabel()] ? true : false;
    }

    /**
     * Returns the outgoing edge of the current vertex with another (destination) vertex.
     * @param vertex the destination vertex
     * @returns the corresponding edge of undefined if it doesn't exist
     */
    public getOutEdgeWith(vertex: Vertex): Edge | undefined {
        return this.outEdges[vertex.getLabel()];
    }

    /**
     * Returns an array with the neighbor vertices of all outgoing edges.
     * @return the neighbor vertices of all outgoing edges.
     */
    public getOutNeighbors(): Vertex[] {
        const neighbors: Vertex[] = [];
        for (let key in this.outEdges) {
            if (this.outEdges.hasOwnProperty(key))
                neighbors.push(this.outEdges[key].getDestination());
        }
        return neighbors;
    }

    /**
     * Returns the number of neighbor vertices of all outgoing edges.
     * @return the number of neighbor vertices of all outgoing edges.
     */
    public getOutNeighborsNum(): number {
        let neighborsNum = 0;
        for (let key in this.outEdges) {
            if (this.outEdges.hasOwnProperty(key))
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
        if (this.getOutEdgesNum() !== vertex.getOutEdgesNum())
            return false;
        const outEdges = this.getOutEdges();
        for (let edge of outEdges) {
            if (!vertex.outEdges[edge.getDestination().getLabel()])
                return false;
        }
        return true;
    }

}
