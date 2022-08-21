import Graph from './graph'
import { VertexLabelType } from './vertex'

/**
 * An directed graph class.
 */
export default class DirectedGraph extends Graph {

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
        return this;
    }

}
