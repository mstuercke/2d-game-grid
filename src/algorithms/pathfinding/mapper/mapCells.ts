import {Grid} from '../../../Grid';
import {Cell} from '../../../Cell';

/**
 * Converts the path coordinates into an array of cells
 * @param grid The grid
 * @param path An array of path coordinates ([x, y])
 * @returns An array of cells in the same order as the path
 */
export function mapCells<Value>(grid: Grid<Value>, path: number[][]): Cell<Value>[] {
  return path.map(([col, row]) => grid.getCell({row, col}));
}
