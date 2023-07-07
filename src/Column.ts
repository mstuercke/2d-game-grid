import {Grid} from './Grid';

export class Column<T> {
  constructor(private grid: Grid<T>, public col: number) {
  }

  listCells(): T[] {
    const cells: T[] = [];
    for (let row = 0; row < this.grid.height; row++) {
      cells.push(this.getCell(row));
    }
    return cells;
  }

  getCell(row: number): T {
    return this.grid.getCell({col: this.col, row});
  }

  setCell(row: number, value: T): void {
    this.grid.setCell({col: this.col, row}, value);
  }
}
