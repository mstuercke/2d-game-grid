import {DistanceAlgorithm} from './DistanceAlgorithm';
import {Cell} from '../../Cell';
import {ALL_DIRECTIONS} from '../../Direction';

/**
 * @param cell THe start cell
 * @param maxDistance The maximum distance (including) to a cell that should be returned
 * @param algorithm The algorithm that should be used for the distance calculation
 * @returns All cells that are in the distance (excluding the start cell)
 */
export function listCellsInDistance<Value>(cell: Cell<Value>, maxDistance: number, algorithm: DistanceAlgorithm): Cell<Value>[] {
  const neighbors = cell.neighbors.list(ALL_DIRECTIONS);

  const cellsInDistance: Cell<Value>[] = [];
  const checkedIds: string[] = [cell.id];
  const cellsToCheck = [...neighbors];
  while (cellsToCheck.length > 0) {
    const cellToCheck = cellsToCheck.pop();

    cellToCheck?.neighbors
        .list(ALL_DIRECTIONS)
        .filter(neighbor => !checkedIds.includes(neighbor.id))
        .filter(neighbor => neighbor.getDistance(cell, algorithm) <= maxDistance)
        .forEach(neighbor => {
          cellsInDistance.push(neighbor);
          cellsToCheck.push(neighbor);
          checkedIds.push(neighbor.id);
        });
  }

  return cellsInDistance;
}
