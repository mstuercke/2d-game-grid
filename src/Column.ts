import {Grid} from './Grid';
import {Cell} from './Cell';

/**
 * The column of a grid contains all information of the columns' cells
 */
export class Column<Value> {
  public readonly id: string;

  /**
   * @param grid The grid this column is part of
   * @param col The column coordinate inside the grid
   */
  constructor(private grid: Grid<Value>, public col: number) {
    this.id = `column|${col}`;
  }

  /**
   * @returns all cells of this column
   */
  listCells(): Cell<Value>[] {
    const cells: Cell<Value>[] = [];
    for (let row = 0; row < this.grid.height; row++) {
      cells.push(this.getCell(row));
    }
    return cells;
  }

  /**
   * @param row The row coordinate of the grid
   * @returns A cell
   */
  getCell(row: number): Cell<Value> {
    return this.grid.getCell({col: this.col, row});
  }
}
