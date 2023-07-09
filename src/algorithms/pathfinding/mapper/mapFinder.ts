import {AStarFinder, BestFirstFinder, BreadthFirstFinder, DijkstraFinder, Finder, FinderOptions} from 'pathfinding';
import {PathfindingAlgorithm} from '../PathfindingOptions';

export function mapFinder(algorithm: PathfindingAlgorithm, finderOptions: FinderOptions): Finder {
  return new {
    A_STAR: AStarFinder,
    BEST_FIRST: BestFirstFinder,
    BREADTH_FIRST: BreadthFirstFinder,
    DIJKSTRA: DijkstraFinder,
  }[algorithm](finderOptions);
}
