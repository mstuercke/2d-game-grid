import type {SquareCell} from '../../SquareCell'
import {ALL_DIRECTIONS, UniqueCellQueue} from '@2d-game-grid/core'
import type {DistanceAlgorithm} from './DistanceAlgorithm'
import type {SquareDirections} from '../../SquareDirections'

/**
 * @param cell The start cell
 * @param maxDistance The maximum distance (including) to a cell that should be returned
 * @param algorithm The algorithm that should be used for the distance calculation
 * @returns All cells that are in the distance (excluding the start cell)
 */
export function listCellsInDistance<Value>(
  cell: SquareCell<Value>,
  maxDistance: number,
  algorithm: DistanceAlgorithm,
): SquareCell<Value>[] {
  const queue = new UniqueCellQueue<Value, SquareDirections, SquareCell<Value>>()
  const neighbors = cell.neighbors.list(ALL_DIRECTIONS)
  queue.ignore(cell)
  queue.addAll(neighbors)

  const cellsInDistance: SquareCell<Value>[] = []
  while (queue.hasNext()) {
    const nextCell = queue.getNext()
    if (nextCell.getDistance(cell, algorithm) <= maxDistance) {
      cellsInDistance.push(nextCell)
      queue.addAll(nextCell.neighbors.list(ALL_DIRECTIONS))
    }
  }

  return cellsInDistance
}
