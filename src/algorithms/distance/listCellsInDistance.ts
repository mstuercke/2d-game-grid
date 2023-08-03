import {Cell} from '../../Cell';
import {ALL_DIRECTIONS} from '../../Direction';
import {UniqueCellQueue} from '../../utils/UniqueCellQueue';
import {DistanceAlgorithm} from './DistanceAlgorithm';

/**
 * @param cell The start cell
 * @param maxDistance The maximum distance (including) to a cell that should be returned
 * @param algorithm The algorithm that should be used for the distance calculation
 * @returns All cells that are in the distance (excluding the start cell)
 */
export function listCellsInDistance<Value>(cell: Cell<Value>, maxDistance: number, algorithm: DistanceAlgorithm): Cell<Value>[] {
  const queue = new UniqueCellQueue<Value>();
  const neighbors = cell.neighbors.list(ALL_DIRECTIONS);
  queue.ignore(cell);
  queue.addAll(neighbors);

  const cellsInDistance: Cell<Value>[] = [];
  while (queue.hasNext()) {
    const nextCell = queue.getNext();
    if (nextCell.getDistance(cell, algorithm) <= maxDistance) {
      cellsInDistance.push(nextCell);
      queue.addAll(nextCell.neighbors.list(ALL_DIRECTIONS));
    }
  }

  return cellsInDistance;
}
