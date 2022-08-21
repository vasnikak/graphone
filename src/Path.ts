import Vertex from "./Vertex"

export default class Path {

    private path: Vertex[];

    constructor(path: Vertex[] = []) {
        this.path = path;
    }

    public getPath() {
        return this.path;
    }

    public length(): number {
        return this.path.length;
    }

    public isEmpty(): boolean {
        return (this.path.length === 0);
    }

    /**
     * Appends a node in the path.
     * @param node the node
     * @returns the current path
     */
     public add(node: Vertex): Path {
        this.path.push(node);
        return this;
    }
    
    /**
     * Append a list of nodes in the path.
     * @param nodes the list of nodes
     * @returns the current path
     */
    public addAll(nodes: Vertex[]): Path {
        nodes.forEach(node => this.path.push(node));
        return this;
    }
    
    /**
     * A synonym of {@link Path#add}.
     * @param node the node
     * @returns the current path
     */
    public push(node: Vertex): Path {
        this.path.push(node);
        return this;
    }

    /**
     * Inserts a node at the start of the path.
     * @param node the node
     * @returns the current path
     */
     public prepend(node: Vertex): Path {
        this.path.unshift(node);
        return this;
    }
    
    /**
     * Reverses the nodes in the path.
     * @returns the current path
     */
    public reverse(): Path {
        this.path.reverse();
        return this;
    }

    /**
     * Checks if the path starts with a specific node.
     * @param node the node
     * @returns true or false
     */
     public startsWith(node: Vertex): boolean {
        return (this.path.length > 0 && this.path[0].equals(node));
    }
    
    /**
     * Checks if the path ends with a specific node.
     * @param node the node
     * @returns true or false
     */
    public endsWith(node: Vertex): boolean {
        return (this.path.length > 0 && this.path[this.path.length - 1].equals(node));
    }

    /**
     * Checks if the current path is valid.
     * A valid path has a connection between every two consecutive vertices.
     * @returns true or false according to if the current path is valid
     */
     public validate(): boolean {
        for (let i = 0; i < this.path.length - 1; i++) {
            if (!this.path[i].hasEdgeWith(this.path[i + 1]))
                return false;
        }
        return true;
    }

    /**
     * Calculates and returns the total cost of the path.
     * The total cost is defined as the sum of the weights of the path's edges.
     * @returns the total cost of the path.
     */
    public getTotalCost(): number {
        let totalCost = 0;
        for (let i = 0; i < this.path.length - 1; i++) {
            const edge = this.path[i].getEdgeWith(this.path[i + 1]);
            if (!edge)
                return 0;
            totalCost += edge.getWeight();
        }
        return totalCost;
    }

     public toString(): string {
         let str = '';
         this.path.forEach((node: Vertex, i: number) => {
            if (i > 0)
                str += ' -> ';
            str += node.toString();
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
