import {Grid as FinderGrid} from 'pathfinding'
import type {Coordinate} from '@2d-game-grid/core'
import type {SquareCell} from '../../SquareCell'
import type {SquareGrid} from '../../SquareGrid'
import type {PathfindingOptions} from './PathfindingOptions'
import {mapCells} from './mapper/mapCells'
import {mapPathfindingDiagonalMovement} from './mapper/mapPathfindingDiagonalMovement'
import {mapWalkableMatrix} from './mapper/mapWalkableMatrix'
import {mapFinder} from './mapper/mapFinder'
import {mapHeuristic} from './mapper/mapHeuristic'

/**
 * @param grid The grid
 * @param start The coordinate that the path should start
 * @param end The coordinate that the path should end
 * @param options The options to customize the pathfinding
 * @returns The shortest path including the start and the end cell
 */
export function getPath<Value>(
  grid: SquareGrid<Value>,
  start: Coordinate,
  end: Coordinate,
  options?: PathfindingOptions<Value>,
): SquareCell<Value>[] {
  const {
    algorithm = 'A_STAR',
    diagonalMovement = 'ALWAYS',
    heuristic = 'MANHATTAN',
    isWalkable = () => true,
  } = options || {}

  const matrix = mapWalkableMatrix(grid, isWalkable)
  const pathfindingGrid = new FinderGrid(matrix)
  const finder = mapFinder(algorithm, {
    diagonalMovement: mapPathfindingDiagonalMovement(diagonalMovement),
    heuristic: mapHeuristic(grid, heuristic),
  })

  const path = finder.findPath(start.col, start.row, end.col, end.row, pathfindingGrid)
  return mapCells(grid, path)
}
