import UndirectedGraph from "../src/UndirectedGraph";

export interface MazeCell {
    x: number;
    y: number;
    value: number;
};

export default class Maze {

    private maze: number[][];

    constructor(maze: number[][]) {
        this.maze = maze;
    }

    public generateGraph(name?: string): UndirectedGraph {
        const graph = new UndirectedGraph(name);
        for (let i = 0; i < this.maze.length; i++) { 
            for (let j = 0; j < this.maze[i].length; j++)
                graph.addVertex('(' + i + ', ' + j + ')', {x: i, y: j, value: this.maze[i][j]});
        }
        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                if (this.maze[i][j] === 1)
                    continue;
                if (i > 0 && this.maze[i - 1][j] === 0)
                    graph.addEdge('(' + i + ', ' + j + ')', '(' + (i - 1) + ', ' + j + ')');
                if (i < this.maze.length - 1 && this.maze[i + 1][j] === 0)
                    graph.addEdge('(' + i + ', ' + j + ')', '(' + (i + 1) + ', ' + j + ')');
                if (j > 0 && this.maze[i][j - 1] === 0)
                    graph.addEdge('(' + i + ', ' + j + ')', '(' + i + ', ' + (j - 1) + ')');
                if (j < this.maze[i].length - 1 && this.maze[i][j + 1] === 0)
                    graph.addEdge('(' + i + ', ' + j + ')', '(' + i + ', ' + (j + 1) + ')');
            }
        }
        return graph;
    }

}
