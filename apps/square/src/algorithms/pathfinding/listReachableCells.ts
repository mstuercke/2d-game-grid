import type {SquareCell} from '../../SquareCell'
import {
  ALL_DIRECTIONS,
  type DiagonalDirection,
  type Direction,
  type StraightDirection,
  UniqueCellQueue,
} from '@2d-game-grid/core'
import type {PathfindingOptions} from './PathfindingOptions'

/**
 * @param cell The start cell
 * @param maxPathSteps The maximum amount of steps (including) to a cell that should be returned (start and end cell included)
 * @param options The options to customize the pathfinding
 * @returns All cells that are reachable (excluding the start cell)
 */
export function listReachableCells<Value>(
  cell: SquareCell<Value>,
  maxPathSteps: number,
  options?: PathfindingOptions<Value>,
): SquareCell<Value>[] {
  const queue = new UniqueCellQueue<Value, SquareCell<Value>, Direction, StraightDirection, DiagonalDirection>()
  const neighbors = cell.neighbors.list(ALL_DIRECTIONS)
  queue.ignore(cell)
  queue.addAll(neighbors)

  const reachableCells: SquareCell<Value>[] = []
  while (queue.hasNext()) {
    const nextCell = queue.getNext()
    const steps = cell.getPath(nextCell, options).length
    if (steps >= 1 && steps <= maxPathSteps) {
      reachableCells.push(nextCell)
      queue.addAll(nextCell.neighbors.list(ALL_DIRECTIONS))
    }
  }

  return reachableCells
}
