import AlgorithmExecutionStats from '../AlgorithmExecutionStats';

export default class FindPathAlgorithmExecutionStats extends AlgorithmExecutionStats {

    /**
     * Path's length (find path algorithms).
     */
    private pathLength: number;
    /**
     * Solution found (find path algorithms).
     */
    private solutionFound: boolean;

    constructor(algorithmName?: string) {
        super(algorithmName);
        this.pathLength = 0;
        this.solutionFound = false;
    }

    /**
     * Resets the stats for the current object.
     * @returns the current stats instance
     */
    public reset(): AlgorithmExecutionStats {
        super.reset();
        this.pathLength = 0;
        this.solutionFound = false;
        return this;
    }
     
    public getPathLength() {
        return this.pathLength;
    }

    public setPathLength(pathLength: number): FindPathAlgorithmExecutionStats {
        this.pathLength = pathLength;
        return this;
    }
    
    public wasSolutionFound(): boolean {
        return this.solutionFound;
    }
    
    public setSolutionFound(solutionFound: boolean): FindPathAlgorithmExecutionStats {
        this.solutionFound = solutionFound;
        return this;
    }

    public toString(): string {
        let str = super.toString();
        str += 'Solution was found: ' + (this.solutionFound ? 'Yes' : 'No') + '\n';
        if (this.pathLength > 0)
            str += 'Path length: ' + this.pathLength + '\n';
        return str;
    }

}
