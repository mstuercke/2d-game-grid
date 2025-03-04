import type {SquareGrid} from '../../../SquareGrid.js'
import type {SquareCell} from '../../../SquareCell.js'

/**
 * Converts the grid into a matrix for the pathfinding lib
 * @param grid The grid
 * @param isWalkable A function that returns true, when the cell is walkable
 * @returns A 2-dimensional array with a 0 for walkable cells and a 1 for not walkable cells (walls)
 */
export function mapWalkableMatrix<Value>(
  grid: SquareGrid<Value>,
  isWalkable: (cell: SquareCell<Value>) => boolean,
): (0 | 1)[][] {
  return grid.rows.map((row) => row.cells.map((cell) => (isWalkable(cell) ? 0 : 1)))
}
