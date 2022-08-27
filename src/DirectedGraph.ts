import Graph from "./Graph";
import { VertexLabelType } from "./Vertex";

/**
 * A directed graph class.
 */
export default class DirectedGraph extends Graph {

    /**
     * Creates a named directed graph.
     * @param name the name of the graph
     */
    constructor(name?: string) {
        super(name);
    }

    /**
     * Adds a directed edge between two vertices.
     * @param label1 the label of the first vertex
     * @param label2 the label of the second vertex
     * @param weight the weight of the edge
     * @return the current graph
     */
    public addEdge(label1: VertexLabelType, label2: VertexLabelType, weight: number = 1): Graph {
        const v1 = this.getVertex(label1);
        if (!v1)
            return this;
        const v2 = this.getVertex(label2);
        if (!v2)
            return this;
        v1.addOutEdgeWith(v2, weight);
        v2.addInEdgeWith(v1, weight);
        return this;
    }

    /**
     * Removes an edge between two vertices.
     * @param label1 the label of the first vertex
     * @param label2 the label of the second vertex
     * @return the current graph
     */
    public removeEdge(label1: VertexLabelType, label2: VertexLabelType): Graph {
        const v1 = this.getVertex(label1);
        if (!v1)
            return this;
        const v2 = this.getVertex(label2);
        if (!v2)
            return this;
        v1.removeOutEdgeWith(v2);
        v2.removeInEdgeWith(v1);
        return this;
    }

    /**
     * Returns the number of edges of the graph.
     * @return the number of edges of the graph
     */
    public getEdgesNum(): number {
        let edgesNum = 0;
        this.getVertices().forEach(vertex => edgesNum += vertex.getOutEdgesNum());
        return edgesNum;
    }

}
