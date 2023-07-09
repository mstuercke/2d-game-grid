import {Cell} from '../../Cell';

export type PathfindingAlgorithm = 'A_STAR' | 'BEST_FIRST' | 'BREADTH_FIRST' | 'DIJKSTRA'
export type HeuristicAlgorithm = 'MANHATTAN' | 'CHEBYSHEV' | 'EUCLIDEAN' | 'OCTILE'
export type HeuristicFunction<Value> = (cell: Cell<Value>) => number
export type DiagonalMovement = 'ALWAYS' | 'NEVER' | 'IF_AT_MOST_ONE_OBSTACLE' | 'ONLY_WHEN_NO_OBSTACLES'

export interface PathfindingOptions<Value> {
  algorithm?: PathfindingAlgorithm;
  heuristic?: HeuristicAlgorithm | HeuristicFunction<Value>;
  isWalkable?: (cell: Cell<Value>) => boolean;
  diagonalMovement?: DiagonalMovement;
  allowCrossCorners?: boolean;
}
