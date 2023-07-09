import {Grid} from '../../../Grid';
import {Cell} from '../../../Cell';

export function mapCells<Value>(grid: Grid<Value>, path: number[][]): Cell<Value>[] {
  return path.map(([col, row]) => grid.getCell({row, col}));
}
