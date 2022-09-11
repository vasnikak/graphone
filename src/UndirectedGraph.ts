import Graph from './Graph';
import Vertex, { VertexLabelType } from './Vertex';

/**
 * An undirected graph class.
 */
export default class UndirectedGraph extends Graph {

    /**
     * Creates a named undirected graph.
     * @param name the name of the graph
     */
    constructor(name?: string) {
        super(name);
    }

    /**
     * Adds an undirected edge between two vertices.
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
        v2.addOutEdgeWith(v1, weight);
        v1.addInEdgeWith(v2, weight);
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
        v2.removeOutEdgeWith(v1);
        v1.removeInEdgeWith(v2);
        return this;
    }

    /**
     * Returns the number of edges of the graph.
     * @return the number of edges of the graph
     */
    public getEdgesNum(): number {
        let edgesNum = 0;
        this.getVertices().forEach(vertex => edgesNum += vertex.getOutEdgesNum());
        return edgesNum / 2;
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
        const hasCyclesHelper = (v: Vertex, parent: Vertex | null) => {
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
                if (child.equals(v) || child.equals(parent))
                    continue;
                if (hasCyclesHelper(child, v))
                    return true;
            }

            recStack.set(v.getLabel(), false);

            return false;
        };
        
        for (let v of vertices) {
            if (!visited.get(v.getLabel()) && hasCyclesHelper(v, null))
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
        return (2 * edgesNum) / (verticesNum * (verticesNum - 1));
     }

}
