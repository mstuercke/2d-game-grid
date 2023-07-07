import {Grid} from './Grid';

export class Row<Cell> {
  constructor(private grid: Grid<Cell>, public row: number) {
  }

  listCells(): Cell[] {
    return this.grid.cells[this.row]
  }

  getCell(col: number): Cell {
    return this.grid.getCell({row: this.row, col});
  }

  setCell(col: number, value: Cell): void {
    this.grid.setCell({row: this.row, col}, value);
  }
}
