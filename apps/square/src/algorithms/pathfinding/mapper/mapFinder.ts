import {
  AStarFinder,
  BestFirstFinder,
  BreadthFirstFinder,
  DijkstraFinder,
  type Finder,
  type FinderOptions,
} from 'pathfinding'
import type {PathfindingAlgorithm} from '../PathfindingOptions'

/**
 * @param algorithm The path algorithm
 * @param finderOptions The finder options
 * @returns An initialized Finder
 */
export function mapFinder(algorithm: PathfindingAlgorithm, finderOptions: FinderOptions): Finder {
  return new {
    A_STAR: AStarFinder,
    BEST_FIRST: BestFirstFinder,
    BREADTH_FIRST: BreadthFirstFinder,
    DIJKSTRA: DijkstraFinder,
  }[algorithm](finderOptions)
}
