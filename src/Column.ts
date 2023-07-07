import {Grid} from './Grid';

export class Column<Cell> {
  constructor(private grid: Grid<Cell>, public col: number) {
  }

  listCells(): Cell[] {
    const cells: Cell[] = [];
    for (let row = 0; row < this.grid.height; row++) {
      cells.push(this.getCell(row));
    }
    return cells;
  }

  getCell(row: number): Cell {
    return this.grid.getCell({col: this.col, row});
  }

  setCell(row: number, value: Cell): void {
    this.grid.setCell({col: this.col, row}, value);
  }
}
