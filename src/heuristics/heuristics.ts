/**
 * Each heuristic function returns a value that is greater or equal to zero.
 */
export type HeuristicFunction = (value: any) => number;

/**
 * This heuristic function returns always the value zero.
 */
export const zeroHeuristicFunction: HeuristicFunction = () => 0;
