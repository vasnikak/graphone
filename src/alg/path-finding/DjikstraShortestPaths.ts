import PriorityQueue from '../../common/PriorityQueue';
import Graph from '../../Graph';
import Path from '../../Path';
import Vertex, { VertexLabelType } from '../../Vertex';
import { GraphAlgorithmOptions } from '../GraphAlgorithm';
import FindMultiplePathsGraphAlgorithm from './FindMultiplePathsGraphAlgorithm';
import FindPathAlgorithmExecutionStats from './FindPathAlgorithmExecutionStats';

class QueueItem {

    vertex: Vertex;
    parent: Vertex | null;
    totalCost: number;

    constructor(vertex: Vertex, parent: Vertex | null, totalCost: number) {
        this.vertex = vertex;
        this.parent = parent;
        this.totalCost = totalCost;
    }

}

/**
 * Dijkstra algorithm. 
 * It discovers the shortest paths in a graph between a source vertex and
 * all the rest.
 */
export default class DjiktraShortestPaths extends FindMultiplePathsGraphAlgorithm {

    /**
     * The name of the algorithm.
     */
    public static readonly algorithmName: string = 'Djikstra shortest paths';

    constructor(graph: Graph, options?: GraphAlgorithmOptions) {
        super(graph, options);
    }

    /**
     * Finds the shortest paths from a vertex to every other vertex in the graph.
     * @param startLabel the label of the starting vertex
     * @returns a Map with the path for each vertex
     */
    public findShortestPaths(startLabel: VertexLabelType): Map<VertexLabelType, Path> {
        // Exec stats
        this.execStats = new FindPathAlgorithmExecutionStats(DjiktraShortestPaths.algorithmName);
        this.execStats.reset();

        const pathMap = new Map<VertexLabelType, Path>();

        // Find the corresponding start vertex
        const startVertex = this.graph.getVertex(startLabel);
        if (!startVertex) {
            this.execStats.stopExecution();
            return pathMap;
        }

        // The open set will be a priority queue
        const djikstraComparator = (a: QueueItem, b: QueueItem) => {
            return (a.totalCost !== b.totalCost || !this.options.collisionRes) ?
                    (a.totalCost - b.totalCost) :
                    this.options.collisionRes(a.vertex.getData(), b.vertex.getData());
        };
        const queue = new PriorityQueue<QueueItem>(djikstraComparator);
        // The closed set will be a map
        const visited = new Map<VertexLabelType, QueueItem>();

        // Initialize the open set
        const source = new QueueItem(startVertex, null, 0);
        queue.push(source);
        this.graph.getVertices().forEach(vertex => {
            if (!startVertex.equals(vertex)) {
                const qItem = new QueueItem(vertex, null, Number.MAX_VALUE);
                queue.push(qItem);
            }
        });
        // While the open set is not empty
        while (!queue.isEmpty()) { 
            // Get the item with the smallest total cost
            const current = queue.peek() as QueueItem;
            // Mark the current item as visited
            visited.set(current.vertex.getLabel(), current);
            // Exec stats
            this.execStats.incVerticesVisitedNum();
            // Iterate over its direct neighbors
            current.vertex.getOutEdges().forEach(edge => {
                // We need only those that they are still in the open set
                if (!visited.get(edge.getDestination().getLabel())) {
                    // Calculate the new cost
                    const newCost = current.totalCost + edge.getWeight();
                    // If the new cost is less than the actual one, we have to update it
                    const qItems = queue.getItems();
                    for (let i = 0; i < qItems.length; i++) {
                        if (qItems[i].vertex.equals(edge.getDestination())) {
                            if (newCost < qItems[i].totalCost) {
                                qItems[i].parent = current.vertex;
                                qItems[i].totalCost = newCost;
                            }
                            break;
                        }
                    }
                }
            });
            // Remove the current item from the priority queue
            queue.pop();
            // Re-arrange the priority queue
            queue.rearrange();
        }

        // For each one of the vertices
        for (const qItem of visited.values()) {
            // Construct its path from start
            const path = new Path();
            let run: QueueItem | null = qItem;
            while (run) {
                path.prepend(run.vertex);
                run = run.parent ? visited.get(run.parent.getLabel()) as QueueItem : null;
            }
            // If the path starts with the start vertex
            if (path.startsWith(startVertex))
                // Insert its path in the map
                pathMap.set(qItem.vertex.getLabel(), path);
            // Else, insert an empty path
            else
                pathMap.set(qItem.vertex.getLabel(), new Path());
        }

        // Exec stats
        this.execStats.stopExecution();

        return pathMap;
    }

}
