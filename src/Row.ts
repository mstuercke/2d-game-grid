import {Grid} from './Grid';
import {Cell} from './Cell';

/**
 * The row of a grid contains all information of the rows' cells
 */
export class Row<Value> {
  public readonly id: string;

  /**
   * @param grid The grid this row is part of
   * @param row The row coordinate inside the grid
   */
  constructor(private grid: Grid<Value>, public row: number) {
    this.id = `row|${row}`;
  }

  /**
   * @returns all cells of this row
   */
  get cells(): Cell<Value>[] {
    const cells: Cell<Value>[] = [];
    for (let col = 0; col < this.grid.width; col++) {
      cells.push(this.getCell(col));
    }
    return cells;
  }

  /**
   * @param col The column coordinate of the grid
   * @returns A cell
   */
  getCell(col: number): Cell<Value> {
    return this.grid.getCell({row: this.row, col});
  }
}
