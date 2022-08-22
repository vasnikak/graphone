/**
 * Execution statistics for the execution of each graph algorithm.
 */
export default class AlgorithmExecutionStats {

    /**
     * Algorithm's name.
     */
     private algorithmName: string | undefined;
     /**
      * Execution start timestamp.
      */
     private execStart: number;
     /**
      * Total execution time (ms).
      */
     private execTime: number;
     /**
      * Number of the vertices that the algorithm visited.
      */
     private nodesVisitedNum: number;

     constructor(algorithmName?: string) {
        this.algorithmName = algorithmName;
        this.execStart = Date.now();
        this.execTime = 0;
        this.nodesVisitedNum = 0;
     }

     /**
     * Resets the stats for the current object.
     * @returns the current stats instance
     */
    public reset(): AlgorithmExecutionStats {
        this.execStart = Date.now();
        this.execTime = 0;
        this.nodesVisitedNum = 0;
        return this;
    }

    public getAlgorithmName() {
        return this.algorithmName;
    }

    public setAlgorithmName(algorithmName: string) {
        this.algorithmName = algorithmName;
        return this;
    }

    /**
     * Calculates the execution time.
     * @returns the current stats instance
     */
    public stopExecution(): AlgorithmExecutionStats {
        this.execTime = Date.now() - this.execStart;
        return this;
    }

    public getExecTime() {
        return this.execTime;
    }

    /**
     * Returns the execution time in a readable format.
     * @returns the execution time in a readable format
     */
    public getExectimeReadableFormat(): String {
        const seconds = Math.round((this.execTime / 1000) % 60);
        const minutes = Math.round((this.execTime / (1000*60)) % 60);
        const hours = Math.round((this.execTime / (1000*60*60)) % 24);
        if (hours === 0 && minutes === 0 && hours === 0)
            return this.execTime + ' ms';
        return hours + ' h, ' + minutes + ' min, ' + seconds + ' sec';
    }
    
    /**
     * @returns the number of vertices that the algorithm visited
     */
    public getNodesVisitedNum() {
        return this.nodesVisitedNum;
    }

    /**
     * @param nodesVisitedNum the number of vertices that the algorithm visited
     * @returns the current stats instance
     */
    public setNodesVisitedNum(nodesVisitedNum: number): AlgorithmExecutionStats {
        this.nodesVisitedNum = nodesVisitedNum;
        return this;
    }
    
    /**
     * Increases the number of the vertices that the algorithm visited by one.
     * @returns the current stats instance
     */
    public incNodesVisitedNum(): AlgorithmExecutionStats {
        this.nodesVisitedNum++;
        return this;
    }

    public toString(): string {
        let str = 'Execution statistics';
        if (this.algorithmName !)
            str += ' for ' + this.algorithmName;
        str += ':\n';
        str += 'Execution time: ' + this.getExectimeReadableFormat() + '\n';
        str += 'Nodes visited: ' + this.nodesVisitedNum + '\n';
        return str;
    }

}
