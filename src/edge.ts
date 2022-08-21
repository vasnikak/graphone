import Vertex from './vertex'

/**
 * The edge between two vertices.
 * Each edge has a direction from a vertex A to a vertex B.
 * The edge has knowledge only of vertex B.
 */
export default class Edge {
    
    private vertex: Vertex;
    private weight: number;

    public constructor(vertex: Vertex, weight: number = 1) {
        this.vertex = vertex;
        this.weight = weight;
    }

    public getVertex() {
        return this.vertex;
    }

    public getWeight() {
        return this.weight;
    }

    public setWeight(weight: number): Edge {
        this.weight = weight;
        return this;
    }

    public toString(): string {
        return 'Edge[' + this.vertex.toString() + ', weight: ' + this.weight + ']';
    }

}
