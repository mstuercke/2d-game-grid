import type {SquareCell} from '../../SquareCell'

/**
 * An algorithm that could be used for pathfinding
 */
export type PathfindingAlgorithm = 'A_STAR' | 'BEST_FIRST' | 'BREADTH_FIRST' | 'DIJKSTRA'

/**
 * An algorithm that could be used for pathfinding heuristics
 */
export type HeuristicAlgorithm = 'MANHATTAN' | 'CHEBYSHEV' | 'EUCLIDEAN' | 'OCTILE'

/**
 * A custom function that could be used for pathfinding heuristics
 */
export type HeuristicFunction<Value> = (cell: SquareCell<Value>) => number

/**
 * The allowed diagonal movements in pathfinding
 */
export type DiagonalMovement = 'ALWAYS' | 'NEVER' | 'IF_AT_MOST_ONE_OBSTACLE' | 'ONLY_WHEN_NO_OBSTACLES'

/**
 * The configuration for pathfinding
 */
export interface PathfindingOptions<Value> {
  /**
   * The algorithm that should be used
   */
  algorithm?: PathfindingAlgorithm

  /**
   * The algorithm or function that should be used for pathfinding heuristics
   */
  heuristic?: HeuristicAlgorithm | HeuristicFunction<Value>

  /**
   * A function that determines if the cell should be included in the pathfinding.
   * true = walkable
   * false = wall
   */
  isWalkable?: (cell: SquareCell<Value>) => boolean

  /**
   * The allowed diagonal movements in pathfinding
   */
  diagonalMovement?: DiagonalMovement

  /**
   * Allow crossing corners
   */
  allowCrossCorners?: boolean
}
