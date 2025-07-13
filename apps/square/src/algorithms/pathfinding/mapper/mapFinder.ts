import * as pathfinding from 'pathfinding'
import type {PathfindingAlgorithm} from '../PathfindingOptions.js'

/**
 * @param algorithm The path algorithm
 * @param finderOptions The finder options
 * @returns An initialized Finder
 */
export function mapFinder(
  algorithm: PathfindingAlgorithm,
  finderOptions: pathfinding.FinderOptions,
): pathfinding.Finder {
  return new {
    A_STAR: pathfinding.AStarFinder,
    BEST_FIRST: pathfinding.BestFirstFinder,
    BREADTH_FIRST: pathfinding.BreadthFirstFinder,
    DIJKSTRA: pathfinding.DijkstraFinder,
  }[algorithm](finderOptions)
}
