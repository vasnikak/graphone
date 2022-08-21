import Graph from './Graph'
import { VertexLabelType } from './Vertex'

/**
 * An undirected graph class.
 */
export default class UndirectedGraph extends Graph {

    /** @inheritdoc */
    constructor(name?: string) {
        super(name);
    }

    /** @inheritdoc */
    public addEdge(label1: VertexLabelType, label2: VertexLabelType, weight: number = 1): Graph {
        const v1 = this.getVertex(label1);
        if (!v1)
            return this;
        const v2 = this.getVertex(label2);
        if (!v2)
            return this;
        v1.addEdgeWith(v2, weight);
        v2.addEdgeWith(v1, weight);
        return this;
    }

    /** @inheritdoc */
    public removeEdge(label1: VertexLabelType, label2: VertexLabelType): Graph {
        const v1 = this.getVertex(label1);
        if (!v1)
            return this;
        const v2 = this.getVertex(label2);
        if (!v2)
            return this;
        v1.removeEdgeWith(v2);
        v2.removeEdgeWith(v1);
        return this;
    }

}
