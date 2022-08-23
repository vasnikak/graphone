import Graph from './Graph'
import { VertexLabelType } from './Vertex'

/**
 * An undirected graph class.
 */
export default class UndirectedGraph extends Graph {

    /** {@inheritdoc} */
    constructor(name?: string) {
        super(name);
    }

    /** {@inheritdoc} */
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

    /** {@inheritdoc} */
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

}
