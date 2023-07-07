import {Grid} from './Grid';

export class Row<T> {
  constructor(private grid: Grid<T>, public row: number) {
  }

  listCells(): T[] {
    return this.grid.cells[this.row]
  }

  getCell(col: number): T {
    return this.grid.getCell({row: this.row, col});
  }

  setCell(col: number, value: T): void {
    this.grid.setCell({row: this.row, col}, value);
  }
}
