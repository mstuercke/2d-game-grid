import {Heuristic} from 'pathfinding';
import {Grid} from '../../../Grid';
import {HeuristicAlgorithm, HeuristicFunction} from '../PathfindingOptions';

export function mapHeuristic<Value>(grid: Grid<Value>, heuristic: HeuristicAlgorithm | HeuristicFunction<Value>) {
  return typeof heuristic === 'function'
      ? (col: number, row: number) => heuristic(grid.getCell({row, col}))
      : {
        MANHATTAN: Heuristic.manhattan,
        CHEBYSHEV: Heuristic.chebyshev,
        EUCLIDEAN: Heuristic.euclidean,
        OCTILE: Heuristic.octile,
      }[heuristic];
}
