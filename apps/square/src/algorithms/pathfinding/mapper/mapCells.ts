import type {SquareGrid} from '../../../SquareGrid'
import type {SquareCell} from '../../../SquareCell'

/**
 * Converts the path coordinates into an array of cells
 * @param grid The grid
 * @param path An array of path coordinates ([x, y])
 * @returns An array of cells in the same order as the path
 */
export function mapCells<Value>(grid: SquareGrid<Value>, path: number[][]): SquareCell<Value>[] {
  return path.map(([col, row]) => grid.getCell({row, col}))
}
