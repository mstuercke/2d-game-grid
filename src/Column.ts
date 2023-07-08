import {Grid} from './Grid';
import {Cell} from './Cell';

export class Column<Value> {
  public readonly id: string;

  constructor(private grid: Grid<Value>, public col: number) {
    this.id = `column|${col}`;
  }

  listCells(): Cell<Value>[] {
    const cells: Cell<Value>[] = [];
    for (let row = 0; row < this.grid.height; row++) {
      cells.push(this.getCell(row));
    }
    return cells;
  }

  getCell(row: number): Cell<Value> {
    return this.grid.getCell({col: this.col, row});
  }
}
