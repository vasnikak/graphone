import Edge from "./Edge";
import Vertex, { VertexLabelType } from "./Vertex"

export default class Path {

    private path: Vertex[];

    constructor(path: Vertex[] = []) {
        this.path = path;
    }

    /**
     * Returns a list with the vertices in the path.
     * @returns a list with the vertices in the path
     */
    public getPath() {
        return this.path;
    }

    /**
     * Returns the number of vertices in the path.
     * @returns the number of vertices in the path
     */
    public length(): number {
        return this.path.length;
    }

    /**
     * Checks if the path is empty.
     * @returns true if the path is empty
     */
    public isEmpty(): boolean {
        return (this.path.length === 0);
    }

    /**
     * Appends a vertex in the path.
     * @param vertex the vertex
     * @returns the current path
     */
     public add(vertex: Vertex): Path {
        this.path.push(vertex);
        return this;
    }
    
    /**
     * Append a list of vertices in the path.
     * @param vertices the list of vertices
     * @returns the current path
     */
    public addAll(vertices: Vertex[]): Path {
        vertices.forEach(vertex => this.path.push(vertex));
        return this;
    }
    
    /**
     * A synonym of {@link Path#add}.
     * @param vertex the vertex
     * @returns the current path
     */
    public push(vertex: Vertex): Path {
        this.path.push(vertex);
        return this;
    }

    /**
     * Inserts a vertex at the start of the path.
     * @param vertex the vertex
     * @returns the current path
     */
     public prepend(vertex: Vertex): Path {
        this.path.unshift(vertex);
        return this;
    }
    
    /**
     * Reverses the vertices in the path.
     * @returns the current path
     */
    public reverse(): Path {
        this.path.reverse();
        return this;
    }

    /**
     * Checks if the path starts with a specific vertex.
     * @param vertex the vertex
     * @returns true or false
     */
     public startsWith(vertex: Vertex): boolean {
        return (this.path.length > 0 && this.path[0].equals(vertex));
    }
    
    /**
     * Checks if the path ends with a specific vertex.
     * @param vertex the vertex
     * @returns true or false
     */
    public endsWith(vertex: Vertex): boolean {
        return (this.path.length > 0 && this.path[this.path.length - 1].equals(vertex));
    }

    /**
     * Checks if the current path is valid.
     * A valid path has a connection between every two consecutive vertices.
     * @returns true or false according to if the current path is valid
     */
     public validate(): boolean {
        for (let i = 0; i < this.path.length - 1; i++) {
            if (!this.path[i].hasOutEdgeWith(this.path[i + 1]))
                return false;
        }
        return true;
    }

    /**
     * Calculates and returns the total cost of the path.
     * The total cost is defined as the sum of the weights of the path's edges.
     * @returns the total cost of the path
     */
    public getTotalCost(): number {
        let totalCost = 0;
        for (let i = 0; i < this.path.length - 1; i++) {
            const edge = this.path[i].getOutEdgeWith(this.path[i + 1]);
            if (!edge)
                return 0;
            totalCost += edge.getWeight();
        }
        return totalCost;
    }

    /**
     * Returns an array with the labels of the vertices in the path.
     * @returns an array with the labels of the vertices
     */
    public getLabels(): VertexLabelType[] {
        return this.path.map(vertex => vertex.getLabel());
    }

    /**
     * Returns an array with the data of the vertices in the path.
     * @returns an array with the data of the vertices
     */
    public getData(): any[] {
        return this.path.map(vertex => vertex.getData());
    }

    /**
     * Returns the edges of the path.
     * @returns the edges of the path
     */
    public getEdges(): Edge[] {
        const edges: Edge[] = [];
        for (let i = 0; i < this.path.length - 1; i++) {
            const edge = this.path[i].getOutEdgeWith(this.path[i + 1]);
            if (edge)
                edges.push(edge);
            else
                return [];
        }
        return edges;
    }

     public toString(): string {
         let str = '';
         this.path.forEach((vertex: Vertex, i: number) => {
            if (i > 0)
                str += ' -> ';
            str += vertex.toString();
         });
         return str;
     }

    public equals(obj: Path): boolean {
        if (this === obj)
            return true;
        if (!(obj instanceof Path))
            return false;
        const otherPath = obj as Path;
        if (this.path.length !== otherPath.path.length)
            return false;
        for (let i = 0; i < this.path.length; i++) {
            if (!this.path[i].equals(otherPath.path[i]))
                return false;
        }
        return true;
    }

}
