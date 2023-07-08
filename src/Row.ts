import {Grid} from './Grid';
import {Cell} from './Cell';

export class Row<Value> {
  constructor(private grid: Grid<Value>, public row: number) {
  }

  get cells(): Cell<Value>[] {
    const cells: Cell<Value>[] = [];
    for (let col = 0; col < this.grid.width; col++) {
      cells.push(this.getCell(col));
    }
    return cells;
  }

  getCell(col: number): Cell<Value> {
    return this.grid.getCell({row: this.row, col});
  }
}
