import {Grid} from '../../../Grid';
import {Cell} from '../../../Cell';

export function mapWalkableMatrix<Value>(grid: Grid<Value>, isWalkable: (cell: Cell<Value>) => boolean): (0 | 1)[][] {
  return grid.rows.map(row => row.cells.map(cell => isWalkable(cell) ? 0 : 1));
}
