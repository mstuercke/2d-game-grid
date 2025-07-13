import type {Coordinate} from '@2d-game-grid/core'
import type {SquareCell} from '../../SquareCell.js'
import type {SquareGrid} from '../../SquareGrid.js'
import type {PathfindingOptions} from './PathfindingOptions.js'
import {mapCells} from './mapper/mapCells.js'
import {mapPathfindingDiagonalMovement} from './mapper/mapPathfindingDiagonalMovement.js'
import {mapWalkableMatrix} from './mapper/mapWalkableMatrix.js'
import {mapFinder} from './mapper/mapFinder.js'
import {mapHeuristic} from './mapper/mapHeuristic.js'
import * as pathfinding from 'pathfinding'

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
  const pathfindingGrid = new pathfinding.Grid(matrix)
  const finder = mapFinder(algorithm, {
    diagonalMovement: mapPathfindingDiagonalMovement(diagonalMovement),
    heuristic: mapHeuristic(grid, heuristic),
  })

  const path = finder.findPath(start.col, start.row, end.col, end.row, pathfindingGrid)
  return mapCells(grid, path)
}
