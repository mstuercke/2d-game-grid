import {Neighbours} from './Neighbours';
import {Coordinate} from './Coordinate';
import {Row} from './Row';
import {Column} from './Column';
import {CellDoesNotExistInGridError} from './errors/CellDoesNotExistInGridError';

export class Grid<T> {
  readonly cells: T[][];

  constructor(public width: number, public height: number, initialValue: (coordinate: Coordinate) => T) {
    const cells = new Array(height);
    for (let row = 0; row < height; row++) {
      cells[row] = new Array(width);
      for (let col = 0; col < width; col++) {
        cells[row][col] = initialValue({row, col});
      }
    }
    this.cells = cells;
  }

  cellExists({row, col}: Coordinate): boolean {
    return col >= 0
        && row >= 0
        && row < this.height
        && col < this.width;
  }

  listCells(): T[] {
    return this.cells.flat();
  }

  getCell({row, col}: Coordinate): T {
    if (!this.cellExists({row, col}))
      throw new CellDoesNotExistInGridError(this, {row, col});

    return this.cells[row][col];
  }

  setCell({row, col}: Coordinate, value: T): void {
    if (!this.cellExists({row, col}))
      throw new CellDoesNotExistInGridError(this, {row, col});

    this.cells[row][col] = value;
  }

  getNeighbours(coordinate: Coordinate): Neighbours<T> {
    return new Neighbours(this, coordinate);
  }

  listRows(): Row<T>[] {
    let rows: Row<T>[] = [];
    for (let row = 0; row < this.height; row++) {
      rows.push(new Row<T>(this, row));
    }
    return rows;
  }

  listColumns(): Column<T>[] {
    let cols: Column<T>[] = [];
    for (let col = 0; col < this.width; col++) {
      cols.push(new Column<T>(this, col));
    }
    return cols;
  }

  clone(cloneValue: (value: T) => T = (value) => value): Grid<T> {
    return new Grid(this.width, this.height, ({row, col}) => cloneValue(this.cells[row][col]));
  }
}
