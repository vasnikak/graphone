import Graph from './Graph';
import Vertex, { VertexLabelType } from './Vertex';

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
     * Updates the weight of the edge between two vertices.
     * @param label1 the label of the first vertex
     * @param label2 the label of the second vertex
     * @param weight the weight of the edge
     * @return the current graph
     */
     public setEdgeWeight(label1: VertexLabelType, label2: VertexLabelType, weight: number): Graph {
        const edge = this.getEdge(label1, label2);
        if (edge)
            edge.setWeight(weight);
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

    /**
     * Checks if the graph has cycles.
     * @param ignoreSelfLoops true if self loops are to be ignored
     * @returns true or false according to if the graph has cycle
     */
    public hasCycles(ignoreSelfLoops: boolean = true): boolean {
        const visited = new Map<VertexLabelType, boolean>();
        const recStack = new Map<VertexLabelType, boolean>();
        const vertices = this.getVertices();
        vertices.forEach(v => {
            visited.set(v.getLabel(), false);
            recStack.set(v.getLabel(), false);
        });
        const hasCyclesHelper = (v: Vertex) => {
            if (recStack.get(v.getLabel()))
                return true;
            if (visited.get(v.getLabel()))
                return false;
            visited.set(v.getLabel(), true);
            recStack.set(v.getLabel(), true);

            if (!ignoreSelfLoops && v.hasSelfLoop())
                return true;
            
            const children = v.getOutNeighbors();
            for (let child of children) {
                if (child.equals(v))
                    continue;
                if (hasCyclesHelper(child))
                    return true;
            }

            recStack.set(v.getLabel(), false);

            return false;
        };
        
        for (let v of vertices) {
            if (!visited.get(v.getLabel()) && hasCyclesHelper(v))
                return true;
        }

        return false;
    }

    /**
     * Returns the density of the graph.
     * The density of a graph represents the ratio between the edges present
     * in a graph and the maximum number of edges that the graph can contain.
     * @returns the density of the graph
     */
     public getDensity(): number {
        const edgesNum = this.getEdgesNum();
        const verticesNum = this.getVerticesNum();
        return edgesNum / (verticesNum * (verticesNum - 1));
     }

}
