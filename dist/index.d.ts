declare module 'graphone/src/DirectedGraph' {
  import Graph from 'graphone/src/Graph';
  import { VertexLabelType } from 'graphone/src/Vertex';
  /**
   * A directed graph class.
   */
  export default class DirectedGraph extends Graph {
      /**
       * Creates a named directed graph.
       * @param name the name of the graph
       */
      constructor(name?: string);
      /**
       * Adds a directed edge between two vertices.
       * @param label1 the label of the first vertex
       * @param label2 the label of the second vertex
       * @param weight the weight of the edge
       * @return the current graph
       */
      addEdge(label1: VertexLabelType, label2: VertexLabelType, weight?: number): Graph;
      /**
       * Removes an edge between two vertices.
       * @param label1 the label of the first vertex
       * @param label2 the label of the second vertex
       * @return the current graph
       */
      removeEdge(label1: VertexLabelType, label2: VertexLabelType): Graph;
      /**
       * Returns the number of edges of the graph.
       * @return the number of edges of the graph
       */
      getEdgesNum(): number;
      /**
       * Checks if the graph has cycles.
       * @param ignoreSelfLoops true if self loops are to be ignored
       * @returns true or false according to if the graph has cycle
       */
      hasCycles(ignoreSelfLoops?: boolean): boolean;
      /**
       * Returns the density of the graph.
       * The density of a graph represents the ratio between the edges present
       * in a graph and the maximum number of edges that the graph can contain.
       * @returns the density of the graph
       */
      getDensity(): number;
  }

}
declare module 'graphone/src/Edge' {
  import Vertex from 'graphone/src/Vertex';
  /**
   * The edge between two vertices.
   * Each edge has a direction from a vertex A to a vertex B.
   * Both A and B vertices are stored.
   */
  export default class Edge {
      /**
       * The origin vertex.
       */
      private origin;
      /**
       * The destination vertex.
       */
      private destination;
      /**
       * The weight of the edge. Default value is 1.
       */
      private weight;
      constructor(origin: Vertex, destination: Vertex, weight?: number);
      getOrigin(): Vertex;
      getDestination(): Vertex;
      getWeight(): number;
      setWeight(weight: number): Edge;
      toString(): string;
  }

}
declare module 'graphone/src/Graph' {
  import Edge from 'graphone/src/Edge';
  import Path from 'graphone/src/Path';
  import Vertex, { VertexLabelType } from 'graphone/src/Vertex';
  /**
   * Base class for each graph class.
   * Each graph has a name and a set of vertices.
   */
  export default abstract class Graph {
      /**
       * The default name of a graph, in case that is not given.
       */
      static readonly DEFAULT_GRAPH_NAME = "Graph";
      /**
       * The name of the graph.
       */
      private name;
      /**
       * The set of vertices.
       */
      protected vertices: {
          [label in VertexLabelType]: Vertex;
      };
      /**
       * Creates a named graph.
       * @param name the name of the graph
       */
      constructor(name?: string);
      getName(): string;
      setName(name: string): void;
      /**
       * Returns a list with the vertices of the graph.
       * @returns the list with the vertices
       */
      getVertices(): Vertex[];
      /**
       * Returns the number of vertices of the graph.
       * @returns the number of vertices
       */
      getVerticesNum(): number;
      /**
       * Returns the number of vertices of the graph.
       * @returns the number of vertices
       */
      getOrder(): number;
      /**
       * Returns the number of edges of the graph.
       * @return the number of edges of the graph
       */
      abstract getEdgesNum(): number;
      /**
       * Adds a new vertex to the graph.
       * @param label the label of the vertex
       * @param data the data of the vertex
       * @return the current graph
       */
      addVertex(label: VertexLabelType, data?: any): Graph;
      /**
       * Adds one or more vertices to the graph.
       * The labels are provided as an array. Each array item can either be an item
       * of type VertexLabelType, in case that the vertex has no additional data or
       * an array of exactly two items: the label of the vertex and its corresponding data.
       * @param vertexData the labels of the vertices
       * @returns the current graph
       */
      addVertices(vertexData: (VertexLabelType | [VertexLabelType, any])[]): Graph;
      /**
       * Checks if the graph contains a vertex with a specific label.
       * @param label the label of the vertex
       * @return true or false
       */
      hasVertex(label: VertexLabelType): boolean;
      /**
       * Updates the data of an existing vertex of the graph. If the vertex doesn't
       * exist, it is added.
       * @param label the label of the vertex
       * @param data the data of the vertex
       * @return the current graph
       */
      updateVertex(label: VertexLabelType, data?: any): Graph;
      /**
       * Returns the corresponding vertex for a specific label.
       * @param label the label of the vertex
       * @returns the corresponding vertex or undefined if the label doesn't exist
       */
      getVertex(label: VertexLabelType): Vertex | undefined;
      /**
       * Returns the corresponding data for a specific label of a vertex
       * @param label the label of the vertex
       * @returns the corresponding data or undefined if the label doesn't exist
       */
      getVertexData(label: VertexLabelType): any;
      /**
       * Returns an array of vertices that corresponds to an array of labels
       * @param labels the labels of the vertices
       * @returns the corresponding vertices of the given labels
       */
      getVerticesByLabels(labels: VertexLabelType[]): Vertex[];
      /**
       * Checks if two vertices are connected.
       * @param label1 the label of the first vertex
       * @param label2 the label of the second vertex
       * @return true or false according to if the two vertices are connected
       */
      areNeighbors(label1: VertexLabelType, label2: VertexLabelType): boolean;
      /**
       * Adds an edge between two vertices.
       * @param label1 the label of the first vertex
       * @param label2 the label of the second vertex
       * @param weight the weight of the edge
       * @return the current graph
       */
      abstract addEdge(label1: VertexLabelType, label2: VertexLabelType, weight?: number): Graph;
      /**
       * Adds one or more edges to the graph.
       * The necessary data is provided as an array.
       * Each array item is as well an array, where the first two elements are the origin
       * and destination vertices of the edge and the third element, if present, is the edge's weight.
       * @param edgeData the edges to be added
       * @return the current graph
       */
      addEdges(edgeData: [VertexLabelType, VertexLabelType, number?][]): Graph;
      /**
       * Returns the directed edge between two vertices.
       * @param v1 The origin vertex
       * @param v2 The destination vertex
       * @returns true or false according to if the the origin has a directed edge with the destination
       */
      getEdge(v1: Vertex | VertexLabelType, v2: Vertex | VertexLabelType): Edge | undefined;
      /**
       * Checks if a vertex has a directed edge with another vertex.
       * @param v1 The origin vertex
       * @param v2 The destination vertex
       * @returns true or false according to if the the origin has a directed edge with the destination
       */
      hasEdge(v1: Vertex | VertexLabelType, v2: Vertex | VertexLabelType): boolean;
      /**
       * Removes an edge between two vertices.
       * @param label1 the label of the first vertex
       * @param label2 the label of the second vertex
       * @return the current graph
       */
      abstract removeEdge(label1: VertexLabelType, label2: VertexLabelType): Graph;
      /**
       * Remove one or more edges from the graph.
       * The necessary data is provided as an array.
       * Each array item is as well an array, that contains the origin and destination vertices.
       * @param edgeData the edges to be added
       * @return the current graph
       */
      removeEdges(edgeData: [VertexLabelType, VertexLabelType][]): Graph;
      /**
       * Removes all vertices (and the corresponding edges) from the graph.
       * The graph will remain empty after this action.
       * @return the current graph
       */
      clear(): Graph;
      /**
       * Removes all edges from the graph.
       * @return the current graph
       */
      clearEdges(): Graph;
      /**
       * Returns a path with the corresponding vertices.
       * @param labels a list with the vertices' labels
       * @returns the corresponding path
       */
      getPath(labels: VertexLabelType[]): Path;
      /**
       * Checks if the graph has self loops.
       * @returns true or false according to if the graph has self loops
       */
      hasSelfLoops(): boolean;
      /**
       * Returns the number of self loops of the graph.
       * @returns the number of sels loops
       */
      getSelfLoopCount(): number;
      /**
       * Checks if the graph has cycles.
       * @param ignoreSelfLoops true if self loops are to be ignored
       * @returns true or false according to if the graph has cycle
       */
      abstract hasCycles(ignoreSelfLoops: boolean): boolean;
      /**
       * Returns the density of the graph.
       * The density of a graph represents the ratio between the edges present
       * in a graph and the maximum number of edges that the graph can contain.
       * @returns the density of the graph
       */
      abstract getDensity(): number;
      /**
       * Executes an action on each vertex of the graph.
       * @param action The action to be executed
       */
      forEachVertex(action: (v: Vertex) => any): void;
      toString(): string;
      equals(obj: any): boolean;
  }

}
declare module 'graphone/src/Path' {
  import Edge from 'graphone/src/Edge';
  import Vertex, { VertexLabelType } from 'graphone/src/Vertex';
  export default class Path {
      private path;
      constructor(path?: Vertex[]);
      /**
       * Returns a list with the vertices in the path.
       * @returns a list with the vertices in the path
       */
      getPath(): Vertex[];
      /**
       * Returns the number of vertices in the path.
       * @returns the number of vertices in the path
       */
      length(): number;
      /**
       * Checks if the path is empty.
       * @returns true if the path is empty
       */
      isEmpty(): boolean;
      /**
       * Appends a vertex in the path.
       * @param vertex the vertex
       * @returns the current path
       */
      add(vertex: Vertex): Path;
      /**
       * Append a list of vertices in the path.
       * @param vertices the list of vertices
       * @returns the current path
       */
      addAll(vertices: Vertex[]): Path;
      /**
       * A synonym of {@link Path#add}.
       * @param vertex the vertex
       * @returns the current path
       */
      push(vertex: Vertex): Path;
      /**
       * Inserts a vertex at the start of the path.
       * @param vertex the vertex
       * @returns the current path
       */
      prepend(vertex: Vertex): Path;
      /**
       * Reverses the vertices in the path.
       * @returns the current path
       */
      reverse(): Path;
      /**
       * Checks if the path starts with a specific vertex.
       * @param vertex the vertex
       * @returns true or false
       */
      startsWith(vertex: Vertex): boolean;
      /**
       * Checks if the path ends with a specific vertex.
       * @param vertex the vertex
       * @returns true or false
       */
      endsWith(vertex: Vertex): boolean;
      /**
       * Checks if the current path is valid.
       * A valid path has a connection between every two consecutive vertices.
       * @returns true or false according to if the current path is valid
       */
      validate(): boolean;
      /**
       * Calculates and returns the total cost of the path.
       * The total cost is defined as the sum of the weights of the path's edges.
       * @returns the total cost of the path
       */
      getTotalCost(): number;
      /**
       * Returns an array with the labels of the vertices in the path.
       * @returns an array with the labels of the vertices
       */
      getLabels(): VertexLabelType[];
      /**
       * Returns an array with the data of the vertices in the path.
       * @returns an array with the data of the vertices
       */
      getData(): any[];
      /**
       * Returns the edges of the path.
       * @returns the edges of the path
       */
      getEdges(): Edge[];
      toString(): string;
      equals(obj: Path): boolean;
  }

}
declare module 'graphone/src/UndirectedGraph' {
  import Graph from 'graphone/src/Graph';
  import { VertexLabelType } from 'graphone/src/Vertex';
  /**
   * An undirected graph class.
   */
  export default class UndirectedGraph extends Graph {
      /**
       * Creates a named undirected graph.
       * @param name the name of the graph
       */
      constructor(name?: string);
      /**
       * Adds an undirected edge between two vertices.
       * @param label1 the label of the first vertex
       * @param label2 the label of the second vertex
       * @param weight the weight of the edge
       * @return the current graph
       */
      addEdge(label1: VertexLabelType, label2: VertexLabelType, weight?: number): Graph;
      /**
       * Removes an edge between two vertices.
       * @param label1 the label of the first vertex
       * @param label2 the label of the second vertex
       * @return the current graph
       */
      removeEdge(label1: VertexLabelType, label2: VertexLabelType): Graph;
      /**
       * Returns the number of edges of the graph.
       * @return the number of edges of the graph
       */
      getEdgesNum(): number;
      /**
       * Checks if the graph has cycles.
       * @param ignoreSelfLoops true if self loops are to be ignored
       * @returns true or false according to if the graph has cycle
       */
      hasCycles(ignoreSelfLoops?: boolean): boolean;
      /**
       * Returns the density of the graph.
       * The density of a graph represents the ratio between the edges present
       * in a graph and the maximum number of edges that the graph can contain.
       * @returns the density of the graph
       */
      getDensity(): number;
  }

}
declare module 'graphone/src/Vertex' {
  import Edge from 'graphone/src/Edge';
  /**
   * The key of a vertex is a string.
   * Strict type checking will be applied in all operations.
   */
  export type VertexLabelType = string;
  /**
   * The vertex of a graph.
   * Each vertex contains a set with all the incoming and outgoing edges.
   */
  export default class Vertex {
      /**
       * The label of the vertex.
       */
      private label;
      /**
       * The data that the vertex contains.
       */
      private data;
      /**
       * The incoming edges of the vertex.
       */
      private inEdges;
      /**
       * The outgoing edges of the vertex.
       */
      private outEdges;
      constructor(label: VertexLabelType, data?: any);
      getLabel(): string;
      getData(): any;
      /**
       * Returns a list with all the incoming edges of the vertex.
       * @returns a list with all the incoming edges of the vertex
       */
      getInEdges(): Edge[];
      /**
       * Returns the number of the incoming edges of the vertex.
       * @returns the number of the incoming edges of the vertex
       */
      getInEdgesNum(): number;
      /**
       * Adds an edge to the current vertex's set of incoming edges.
       * @param edge the edge to be added
       * @returns the current vertex
       */
      addInEdge(edge: Edge): Vertex;
      /**
       * Adds an incoming edge with a vertex.
       * @param vertex the vertex to be connected with an outgoing edge.
       * @param weight the weight of the edge
       * @returns the current vertex
       */
      addInEdgeWith(vertex: Vertex, weight?: number): Vertex;
      /**
       * Removes an edge from the current vertex's set of incoming edges.
       * @param edge the incoming edge to be removed
       * @returns the current vertex
       */
      removeInEdge(edge: Edge): Vertex;
      /**
       * Removes an incoming edge with a vertex.
       * @param vertex the vertex
       * @returns the current vertex
       */
      removeInEdgeWith(vertex: Vertex): Vertex;
      /**
       * Checks if the current vertex has a specific incoming edge.
       * @param edge the edge
       * @return true or false
       */
      hasInEdge(edge: Edge): boolean;
      /**
       * Checks if the current vertex has an incoming edge with another vertex.
       * @param vertex the vertex that needs to be checked
       * @return true or false
       */
      hasInEdgeWith(vertex: Vertex): boolean;
      /**
       * Returns an array with the neighbor vertices of all incoming edges.
       * @return the neighbor vertices of all incoming edges
       */
      getInNeighbors(): Vertex[];
      /**
       * Returns the number of neighbor vertices of all incoming edges.
       * @return the number of neighbor vertices of all incoming edges
       */
      getInNeighborsNum(): number;
      /**
       * Returns a list with all the outgoing edges of the vertex.
       * @returns a list with all the outgoing edges of the vertex
       */
      getOutEdges(): Edge[];
      /**
       * Returns the number of the outgoing edges of the vertex.
       * @returns the number of the outgoing edges of the vertex
       */
      getOutEdgesNum(): number;
      /**
       * Adds an edge to the current vertex's set of outgoing edges.
       * @param edge the edge to be added
       * @returns the current vertex
       */
      addOutEdge(edge: Edge): Vertex;
      /**
       * Adds an outgoing edge with a vertex.
       * @param vertex the vertex to be connected with an outgoing edge.
       * @param weight the weight of the edge
       * @returns the current vertex
       */
      addOutEdgeWith(vertex: Vertex, weight?: number): Vertex;
      /**
       * Removes an edge from the current vertex's set of outgoing edges.
       * @param edge the outgoing edge to be removed
       * @returns the current vertex
       */
      removeOutEdge(edge: Edge): Vertex;
      /**
       * Removes an outgoing edge with a vertex.
       * @param vertex the vertex
       * @returns the current vertex
       */
      removeOutEdgeWith(vertex: Vertex): Vertex;
      /**
       * Checks if the current vertex has a specific outdoing edge.
       * @param edge the edge
       * @return true or false
       */
      hasOutEdge(edge: Edge): boolean;
      /**
       * Checks if the current vertex has an outgoing edge with another vertex.
       * @param vertex the vertex that needs to be checked
       * @return true or false
       */
      hasOutEdgeWith(vertex: Vertex): boolean;
      /**
       * Returns the outgoing edge of the current vertex with another (destination) vertex.
       * @param vertex the destination vertex
       * @returns the corresponding edge of undefined if it doesn't exist
       */
      getOutEdgeWith(vertex: Vertex): Edge | undefined;
      /**
       * Returns an array with the neighbor vertices of all outgoing edges.
       * @return the neighbor vertices of all outgoing edges
       */
      getOutNeighbors(): Vertex[];
      /**
       * Returns the number of neighbor vertices of all outgoing edges.
       * @return the number of neighbor vertices of all outgoing edges
       */
      getOutNeighborsNum(): number;
      /**
       * Checks if the current vertex has a self loop.
       * @returns true or false according to if the current vertex has a self loop
       */
      hasSelfLoop(): boolean;
      toString(): string;
      equals(obj: any): boolean;
  }

}
declare module 'graphone/src/alg/AlgorithmExecutionStats' {
  /**
   * Execution statistics for the execution of each graph algorithm.
   */
  export default class AlgorithmExecutionStats {
      /**
       * Algorithm's name.
       */
      private algorithmName;
      /**
       * Execution start timestamp.
       */
      private execStart;
      /**
       * Total execution time (ms).
       */
      private execTime;
      /**
       * Number of the vertices that the algorithm visited.
       */
      private verticesVisitedNum;
      constructor(algorithmName?: string);
      /**
       * Resets the stats for the current object.
       * @returns the current stats instance
       */
      reset(): AlgorithmExecutionStats;
      getAlgorithmName(): string | undefined;
      setAlgorithmName(algorithmName: string): this;
      /**
       * Calculates the execution time.
       * @returns the current stats instance
       */
      stopExecution(): AlgorithmExecutionStats;
      getExecTime(): number;
      /**
       * Returns the execution time in a readable format.
       * @returns the execution time in a readable format
       */
      getExectimeReadableFormat(): String;
      /**
       * @returns the number of vertices that the algorithm visited
       */
      getVerticesVisitedNum(): number;
      /**
       * @param verticesVisitedNum the number of vertices that the algorithm visited
       * @returns the current stats instance
       */
      setVerticesVisitedNum(verticesVisitedNum: number): AlgorithmExecutionStats;
      /**
       * Increases the number of the vertices that the algorithm visited by one.
       * @returns the current stats instance
       */
      incVerticesVisitedNum(): AlgorithmExecutionStats;
      toString(): string;
  }

}
declare module 'graphone/src/alg/GraphAlgorithm' {
  import Graph from 'graphone/src/Graph';
  import AlgorithmExecutionStats from 'graphone/src/alg/AlgorithmExecutionStats';
  /**
   * The type of a collision resolution function.
   * The collision resolution function will be executed on the data of a vertex
   * and it has to return a negative (a < b), 0 (a = b) or positive number (a > b), according to the
   * result of the comparison between the two arguments.
   */
  export type CollisionResolutionFunc = (a: any, b: any) => number;
  /**
   * The options for each graph algorithms.
   */
  export interface GraphAlgorithmOptions {
      /** The collision resolution function. */
      collisionRes?: CollisionResolutionFunc;
  }
  /**
   * The base class for all graph algorithms.
   */
  export default abstract class GraphAlgorithm {
      /**
       * The name of the algorithm.
       */
      static readonly ALGORITHM_NAME: string;
      /**
       * The graph that the algorithm will be executed on.
       */
      protected graph: Graph;
      /**
       * The options of the graph algorithm.
       */
      protected options: GraphAlgorithmOptions;
      /**
       * Algorithm execution statistics.
       */
      protected execStats: AlgorithmExecutionStats | undefined;
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
      getExecStats(): AlgorithmExecutionStats | undefined;
      getOptions(): GraphAlgorithmOptions;
  }

}
declare module 'graphone/src/alg/index' {
  export { default as AlgorithmExecutionStats } from 'graphone/src/alg/AlgorithmExecutionStats';
  export { default as GraphAlgorith, CollisionResolutionFunc } from 'graphone/src/alg/GraphAlgorithm';

}
declare module 'graphone/src/alg/path-finding/AStarShortestPath' {
  import Graph from 'graphone/src/Graph';
  import Path from 'graphone/src/Path';
  import { VertexLabelType } from 'graphone/src/Vertex';
  import HeuristicFindPathGraphAlgorithm, { HeuristicGraphAlgorithmOptions } from 'graphone/src/alg/path-finding/HeuristicFindPathGraphAlgorithm';
  /**
   * A* algorithm.
   * It discovers the shortest path in a graph between two vertices using the
   * A* heuristic algorithm.
   */
  export default class AStarShortestPath extends HeuristicFindPathGraphAlgorithm {
      /**
       * The name of the algorithm.
       */
      static readonly ALGORITHM_NAME: string;
      constructor(graph: Graph, options?: HeuristicGraphAlgorithmOptions);
      /**
       * Finds a path between two vertices in a graph using the A* algorithm.
       * @param startLabel the label of the starting vertex
       * @param endLabel the label of the destination vertex
       * @return the shortest path from start to end
       */
      findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path;
  }

}
declare module 'graphone/src/alg/path-finding/BFSShortestPath' {
  import Graph from 'graphone/src/Graph';
  import Path from 'graphone/src/Path';
  import { VertexLabelType } from 'graphone/src/Vertex';
  import { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  import FindSinglePathGraphAlgorithm from 'graphone/src/alg/path-finding/FindSinglePathGraphAlgorithm';
  /**
   * BFS (Breadth First Search) algorithm.
   * It discovers at path in a graph between two vertices using the BFS algorithm.
   */
  export default class BFSShortestPath extends FindSinglePathGraphAlgorithm {
      /**
       * The name of the algorithm.
       */
      static readonly ALGORITHM_NAME: string;
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
      /**
       * Finds a path between two vertices in a graph using the BFS algorithm.
       * @param startLabel the label of the starting vertex
       * @param endLabel the label of the destination vertex
       * @return the shortest path from start to end
       */
      findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path;
  }

}
declare module 'graphone/src/alg/path-finding/DFSFindPath' {
  import Graph from 'graphone/src/Graph';
  import Path from 'graphone/src/Path';
  import { VertexLabelType } from 'graphone/src/Vertex';
  import { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  import FindPathGraphAlgorithm from 'graphone/src/alg/path-finding/FindSinglePathGraphAlgorithm';
  /**
   * DFS (Depth First Search) algorithm.
   * It discovers at path in a graph between two vertices using the DFS algorithm.
   */
  export default class DFSFindPath extends FindPathGraphAlgorithm {
      /**
       * The name of the algorithm.
       */
      static readonly ALGORITHM_NAME: string;
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
      /**
       * Finds a path between two vertices in a graph using the DFS algorithm.
       * @param startLabel the label of the starting vertex
       * @param endLabel the label of the destination vertex
       * @return the shortest path from start to end
       */
      findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path;
  }

}
declare module 'graphone/src/alg/path-finding/DjikstraShortestPaths' {
  import Graph from 'graphone/src/Graph';
  import Path from 'graphone/src/Path';
  import { VertexLabelType } from 'graphone/src/Vertex';
  import { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  import FindMultiplePathsGraphAlgorithm from 'graphone/src/alg/path-finding/FindMultiplePathsGraphAlgorithm';
  /**
   * Dijkstra algorithm.
   * It discovers the shortest paths in a graph between a source vertex and
   * all the rest.
   */
  export default class DjiktraShortestPaths extends FindMultiplePathsGraphAlgorithm {
      /**
       * The name of the algorithm.
       */
      static readonly ALGORITHM_NAME: string;
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
      /**
       * Finds the shortest paths from a vertex to every other vertex in the graph.
       * @param startLabel the label of the starting vertex
       * @returns a Map with the path for each vertex
       */
      findShortestPaths(startLabel: VertexLabelType): Map<VertexLabelType, Path>;
  }

}
declare module 'graphone/src/alg/path-finding/FindMultiplePathsGraphAlgorithm' {
  import Graph from 'graphone/src/Graph';
  import GraphAlgorithm, { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  /**
   * The algorithms of this type discover multiple paths from a start vertex to other
   * vertices of the graph.
   */
  export default abstract class FindMultiplePathsGraphAlgorithm extends GraphAlgorithm {
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
  }

}
declare module 'graphone/src/alg/path-finding/FindPathAlgorithmExecutionStats' {
  import AlgorithmExecutionStats from 'graphone/src/alg/AlgorithmExecutionStats';
  export default class FindPathAlgorithmExecutionStats extends AlgorithmExecutionStats {
      /**
       * Path's length (find path algorithms).
       */
      private pathLength;
      /**
       * Solution found (find path algorithms).
       */
      private solutionFound;
      constructor(algorithmName?: string);
      /**
       * Resets the stats for the current object.
       * @returns the current stats instance
       */
      reset(): AlgorithmExecutionStats;
      getPathLength(): number;
      setPathLength(pathLength: number): FindPathAlgorithmExecutionStats;
      wasSolutionFound(): boolean;
      setSolutionFound(solutionFound: boolean): FindPathAlgorithmExecutionStats;
      toString(): string;
  }

}
declare module 'graphone/src/alg/path-finding/FindSinglePathGraphAlgorithm' {
  import Graph from 'graphone/src/Graph';
  import Path from 'graphone/src/Path';
  import { VertexLabelType } from 'graphone/src/Vertex';
  import GraphAlgorithm, { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  /**
   * The algorithms of this type discover a path between two vertices in a graph.
   */
  export default abstract class FindPathGraphAlgorithm extends GraphAlgorithm {
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
      /**
       * Finds a path between two vertices in a graph.
       * @param startLabel the label of the starting vertex
       * @param endLabel the label of the destination vertex
       * @return the shortest path from start to end
       */
      abstract findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path;
  }

}
declare module 'graphone/src/alg/path-finding/HeuristicFindPathGraphAlgorithm' {
  import Graph from 'graphone/src/Graph';
  import { HeuristicFunction } from 'graphone/src/heuristics/heuristics';
  import Path from 'graphone/src/Path';
  import { VertexLabelType } from 'graphone/src/Vertex';
  import { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  import FindSinglePathGraphAlgorithm from 'graphone/src/alg/path-finding/FindSinglePathGraphAlgorithm';
  /**
   * The available options for a heuristic path finding algorithm.
   */
  export interface HeuristicGraphAlgorithmOptions extends GraphAlgorithmOptions {
      /** The heuristic function. If non is provided, it will be ignored. */
      heuristicFunc?: HeuristicFunction;
  }
  /**
   * The algorithms of this type discover a path between two vertices in a graph,
   * by using a heuristic function.
   */
  export default abstract class HeuristicFindPathGraphAlgorithm extends FindSinglePathGraphAlgorithm {
      constructor(graph: Graph, options?: HeuristicGraphAlgorithmOptions);
      /**
       * Finds a path between two vertices in a graph.
       * @param startLabel the label of the starting vertex
       * @param endLabel the label of the destination vertex
       * @return the shortest path from start to end
       */
      abstract findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path;
  }

}
declare module 'graphone/src/alg/path-finding/UCSShortestPath' {
  import Graph from 'graphone/src/Graph';
  import Path from 'graphone/src/Path';
  import { VertexLabelType } from 'graphone/src/Vertex';
  import { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  import FindSinglePathGraphAlgorithm from 'graphone/src/alg/path-finding/FindSinglePathGraphAlgorithm';
  /**
   * UCS (Uniform Cost Search) algorithm.
   * It discovers the shortest path in a graph between two vertices using the
   * UCS algorithm.
   */
  export default class UCSShortestPath extends FindSinglePathGraphAlgorithm {
      /**
       * The name of the algorithm.
       */
      static readonly ALGORITHM_NAME: string;
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
      /**
       * Finds a path between two vertices in a graph using the UCS algorithm.
       * @param startLabel the label of the starting vertex
       * @param endLabel the label of the destination vertex
       * @return the shortest path from start to end
       */
      findPath(startLabel: VertexLabelType, endLabel: VertexLabelType): Path;
  }

}
declare module 'graphone/src/alg/path-finding/index' {
  export { default as AStarShortestPath } from 'graphone/src/alg/path-finding/AStarShortestPath';
  export { default as BFSShortestPath } from 'graphone/src/alg/path-finding/BFSShortestPath';
  export { default as DFSFindPath } from 'graphone/src/alg/path-finding/DFSFindPath';
  export { default as DjikstraShortestPaths } from 'graphone/src/alg/path-finding/DjikstraShortestPaths';
  export { default as FindSinglePathGraphAlgorithm } from 'graphone/src/alg/path-finding/FindSinglePathGraphAlgorithm';
  export { default as FindPathAlgorithmExecutionStats } from 'graphone/src/alg/path-finding/FindPathAlgorithmExecutionStats';
  export { default as HeuristicFindPathGraphAlgorithm } from 'graphone/src/alg/path-finding/HeuristicFindPathGraphAlgorithm';
  export { default as UCSShortestPath } from 'graphone/src/alg/path-finding/UCSShortestPath';

}
declare module 'graphone/src/alg/traversal/BFSTraversal' {
  import Graph from 'graphone/src/Graph';
  import Vertex, { VertexLabelType } from 'graphone/src/Vertex';
  import { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  import TraversalGraphAlgorithm from 'graphone/src/alg/traversal/TraversalGraphAlgorithm';
  /**
   * Traverses a graph using BFS.
   */
  export default class BFSTraversal extends TraversalGraphAlgorithm {
      /**
       * The name of the algorithm.
       */
      static readonly ALGORITHM_NAME: string;
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
      /**
       * Traverses the vertices of the graph using the BFS algorithm.
       * The second argument is the action that will be executed on each vertex of the graph during the traversal.
       * In case that the function returns false, the traversal will stop.
       * @param startLabel the label of the starting vertex
       * @param traverseAction the action that will executed on each vertex during the traversal
       */
      traverse(startLabel: VertexLabelType, traverseAction: (vertex: Vertex) => any): void;
  }

}
declare module 'graphone/src/alg/traversal/DFSTraversal' {
  import Graph from 'graphone/src/Graph';
  import Vertex, { VertexLabelType } from 'graphone/src/Vertex';
  import { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  import TraversalGraphAlgorithm from 'graphone/src/alg/traversal/TraversalGraphAlgorithm';
  /**
   * Traverses a graph using DFS.
   */
  export default class DFSTraversal extends TraversalGraphAlgorithm {
      /**
       * The name of the algorithm.
       */
      static readonly ALGORITHM_NAME: string;
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
      /**
       * Traverses the vertices of the graph using the DFS algorithm.
       * The second argument is the action that will be executed on each vertex of the graph during the traversal.
       * In case that the function returns false, the traversal will stop.
       * @param startLabel the label of the starting vertex
       * @param traverseAction the action that will executed on each vertex during the traversal
       */
      traverse(startLabel: VertexLabelType, traverseAction: (vertex: Vertex) => any): void;
  }

}
declare module 'graphone/src/alg/traversal/RandomWalkTraversal' {
  import Graph from 'graphone/src/Graph';
  import Vertex, { VertexLabelType } from 'graphone/src/Vertex';
  import { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  import TraversalGraphAlgorithm from 'graphone/src/alg/traversal/TraversalGraphAlgorithm';
  /**
   * Traverses a graph using random walk traversal.
   */
  export default class RandomWalkTraversal extends TraversalGraphAlgorithm {
      /**
       * The name of the algorithm.
       */
      static readonly ALGORITHM_NAME: string;
      /**
       * Default number of maximum hops.
       */
      static readonly DEFAULT_MAX_HOPS = 100;
      /**
       * The maximum number of hops.
       */
      private maxHops;
      /**
       * Random Walk graversal.
       * @param graph the graph
       * @param options the options
       * @param maxHops the maximum number of steps
       */
      constructor(graph: Graph, options?: GraphAlgorithmOptions, maxHops?: number);
      /**
       * Traverses the vertices of the graph using random walk traversal.
       * The second argument is the action that will be executed on each vertex of the graph during the traversal.
       * In case that the function returns false, the traversal will stop.
       * @param startLabel the label of the starting vertex
       * @param traverseAction the action that will executed on each vertex during the traversal
       */
      traverse(startLabel: VertexLabelType, traverseAction: (vertex: Vertex) => any): void;
  }

}
declare module 'graphone/src/alg/traversal/TraversalGraphAlgorithm' {
  import Graph from 'graphone/src/Graph';
  import Vertex, { VertexLabelType } from 'graphone/src/Vertex';
  import GraphAlgorithm, { GraphAlgorithmOptions } from 'graphone/src/alg/GraphAlgorithm';
  /**
   * The algorithms of this type traverse all vertices of a graph.
   */
  export default abstract class TraversalGraphAlgorithm extends GraphAlgorithm {
      constructor(graph: Graph, options?: GraphAlgorithmOptions);
      /**
       * Traverses the vertices of the graph.
       * The second argument is the action that will be executed on each vertex of the graph during the traversal.
       * In case that the function returns false, the traversal will stop.
       * @param startLabel the label of the starting vertex
       * @param traverseAction the action that will executed on each vertex during the traversal
       */
      abstract traverse(startLabel: VertexLabelType, traverseAction: (vertex: Vertex) => any): void;
  }

}
declare module 'graphone/src/alg/traversal/index' {
  export { default as BFSTraversal } from 'graphone/src/alg/traversal/BFSTraversal';
  export { default as DFSTraversal } from 'graphone/src/alg/traversal/DFSTraversal';
  export { default as RandomWalkTraversal } from 'graphone/src/alg/traversal/RandomWalkTraversal';
  export { default as TraversalGraphAlgorithm } from 'graphone/src/alg/traversal/TraversalGraphAlgorithm';

}
declare module 'graphone/src/common/PriorityQueue' {
  /**
   * Implements a priority queue.
   */
  export default class PriorityQueue<V> {
      private queue;
      private comparator;
      constructor(comparator: (a: any, b: any) => number);
      isEmpty(): boolean;
      push(item: V): void;
      peek(): V | undefined;
      pop(): V | undefined;
      getItems(): V[];
      rearrange(): void;
  }

}
declare module 'graphone/src/common/utils' {
  export const randomInt: (min: number, max: number) => number;

}
declare module 'graphone/src/heuristics/heuristics' {
  /**
   * Each heuristic function returns a value that is greater or equal to zero.
   */
  export type HeuristicFunction = (value: any) => number;
  /**
   * This heuristic function returns always the value zero.
   */
  export const zeroHeuristicFunction: HeuristicFunction;

}
declare module 'graphone/src/index' {
  export { default as Edge } from 'graphone/src/Edge';
  export { default as Vertex, VertexLabelType } from 'graphone/src/Vertex';
  export { default as Graph } from 'graphone/src/Graph';
  export { default as UndirectedGraph } from 'graphone/src/UndirectedGraph';
  export { default as DirectedGraph } from 'graphone/src/DirectedGraph';
  export { default as Path } from 'graphone/src/Path';
  export * from 'graphone/src/heuristics/heuristics';
  export * from 'graphone/src/alg/GraphAlgorithm';
  export * from 'graphone/src/alg/path-finding/index';
  export * from 'graphone/src/alg/traversal/index';

}
declare module 'graphone/src/operators/index' {
  export { reverse, subgraph, toUndirected, union } from 'graphone/src/operators/operators';

}
declare module 'graphone/src/operators/operators' {
  import DirectedGraph from 'graphone/src/DirectedGraph';
  import Graph from 'graphone/src/Graph';
  import UndirectedGraph from 'graphone/src/UndirectedGraph';
  import Vertex, { VertexLabelType } from 'graphone/src/Vertex';
  /**
   * Constructs a subgraph of an already existing graph.
   * @param graph the origin graph
   * @param filteredVertices a list of the vertex labels that the subgraph will contain or a filter function
   * @returns the subgraph
   */
  export const subgraph: (graph: Graph, filteredVertices: string[] | ((v: Vertex) => boolean)) => Graph;
  /**
   * Constructs a directed graph that has the same vertices but the reversed edges
   * of the original graph.
   * @param graph the original graph
   * @returns the reversed graph
   */
  export const reverse: (graph: DirectedGraph) => DirectedGraph;
  /**
   * Returns the undirected version of a directed graph.
   * @param graph the original directed graph
   * @returns the undirected version of the directed graph
   */
  export const toUndirected: (graph: DirectedGraph) => UndirectedGraph;
  /**
   * Returns the union of two graphs.
   * If at least one of the graph is undirected, an undirected graph is returned.
   * If both graphs are directed, a directed graph is returned.
   * The union contains all vertices and edges of the two graph, with precedence given
   * to the second graph.
   * @param g1 the first graph
   * @param g2 the second graph
   * @returns the union of the two graphs
   */
  export const union: (g1: Graph, g2: Graph) => Graph;

}
declare module 'graphone/test/Maze' {
  import UndirectedGraph from 'graphone/src/UndirectedGraph';
  export interface MazeCell {
      x: number;
      y: number;
      value: number;
  }
  export default class Maze {
      private maze;
      constructor(maze: number[][]);
      generateGraph(name?: string): UndirectedGraph;
  }

}
declare module 'graphone/test/test01' {
  export {};

}
declare module 'graphone' {
  import main = require('graphone/src/index');
  export = main;
}