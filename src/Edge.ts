import Vertex from './Vertex'

/**
 * The edge between two vertices.
 * Each edge has a direction from a vertex A to a vertex B.
 * Both A and B vertices are stored.
 */
export default class Edge {
    
    /**
     * The origin vertex.
     */
    private origin: Vertex;
    /**
     * The destination vertex.
     */
    private destination: Vertex;
    /**
     * The weight of the edge. Default value is 1.
     */
    private weight: number;

    public constructor(origin: Vertex, destination: Vertex, weight: number = 1) {
        this.origin = origin;
        this.destination = destination;
        this.weight = weight;
    }

    public getOrigin() {
        return this.origin;
    }

    public getDestination() {
        return this.destination;
    }

    public getWeight() {
        return this.weight;
    }

    public setWeight(weight: number): Edge {
        this.weight = weight;
        return this;
    }

    public toString(): string {
        return 'Edge[' + this.destination.toString() + ', weight: ' + this.weight + ']';
    }

}
