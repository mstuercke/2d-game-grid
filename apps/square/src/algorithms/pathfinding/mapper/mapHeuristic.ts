import {Heuristic} from 'pathfinding'
import type {SquareGrid} from '../../../SquareGrid.js'
import type {HeuristicAlgorithm, HeuristicFunction} from '../PathfindingOptions.js'

/**
 * @param grid The grid
 * @param heuristic The heuristic algorithm or a custom heuristic function
 * @returns A heuristic function for the pathfinding
 */
export function mapHeuristic<Value>(grid: SquareGrid<Value>, heuristic: HeuristicAlgorithm | HeuristicFunction<Value>) {
  return typeof heuristic === 'function'
    ? (col: number, row: number) => heuristic(grid.getCell({row, col}))
    : {
        MANHATTAN: Heuristic.manhattan,
        CHEBYSHEV: Heuristic.chebyshev,
        EUCLIDEAN: Heuristic.euclidean,
        OCTILE: Heuristic.octile,
      }[heuristic]
}
