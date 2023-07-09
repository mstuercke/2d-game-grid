import {Coordinate} from '../../Coordinate';
import {PathfindingOptions} from './PathfindingOptions';
import {Cell} from '../../Cell';
import {Grid} from '../../Grid';
import {Grid as FinderGrid} from 'pathfinding';
import {mapCells} from './mapper/mapCells';
import {mapPathfindingDiagonalMovement} from './mapper/mapPathfindingDiagonalMovement';
import {mapWalkableMatrix} from './mapper/mapWalkableMatrix';
import {mapFinder} from './mapper/mapFinder';
import {mapHeuristic} from './mapper/mapHeuristic';

export function getPath<Value>(
    grid: Grid<Value>,
    start: Coordinate,
    end: Coordinate,
    options?: PathfindingOptions<Value>,
): Cell<Value>[] {
  const {
    algorithm = 'A_STAR',
    diagonalMovement = 'ALWAYS',
    heuristic = 'MANHATTAN',
    isWalkable = () => true,
  } = options || {};

  const matrix = mapWalkableMatrix(grid, isWalkable);
  const pathfindingGrid = new FinderGrid(matrix);
  const finder = mapFinder(algorithm, {
    diagonalMovement: mapPathfindingDiagonalMovement(diagonalMovement),
    heuristic: mapHeuristic(grid, heuristic),
  });

  const path = finder.findPath(start.col, start.row, end.col, end.row, pathfindingGrid);
  return mapCells(grid, path);
}
