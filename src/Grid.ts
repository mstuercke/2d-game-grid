import {Coordinate} from './Coordinate';
import {Row} from './Row';
import {Column} from './Column';
import {CellDoesNotExistInGridError} from './errors/CellDoesNotExistInGridError';
import {InvalidGridSizeError} from './errors/InvalidGridSizeError';
import {Cell} from './Cell';

export interface InitializeGridOptions<Value> {
  width: number,
  height: number,
  initializeCellValue: (coordinate: Coordinate) => Value
}

export interface PreInitializedGridOptions<Value> {
  grid: Value[][];
}

export class Grid<Value> {
  readonly width: number;
  readonly height: number;
  readonly grid: Cell<Value>[][];

  constructor(options: InitializeGridOptions<Value> | PreInitializedGridOptions<Value>) {
    if ('initializeCellValue' in options) {
      this.width = options.width;
      this.height = options.height;
      this.grid = this.initializeCells(this.width, this.height, options.initializeCellValue);
    }

    if ('grid' in options) {
      const rows = options.grid;
      this.height = rows.length;
      this.width = Math.max(0, ...rows.map(row => row.length));
      this.grid = this.initializeCells(this.width, this.height, ({row, col}) => rows[row][col]);
    }
  }

  private initializeCells(width: number, height: number, initializeCellValue: (coordinate: Coordinate) => Value): Cell<Value>[][] {
    if (this.height === 0 || this.width === 0)
      throw new InvalidGridSizeError(width, height);

    const cells = new Array(height);
    for (let row = 0; row < height; row++) {
      cells[row] = new Array(width);
      for (let col = 0; col < width; col++) {
        const coordinate: Coordinate = {row, col};
        const value = initializeCellValue(coordinate);
        cells[row][col] = new Cell(this, coordinate, value);
      }
    }
    return cells;
  }

  cellExists({row, col}: Coordinate): boolean {
    return col >= 0
        && row >= 0
        && row < this.height
        && col < this.width;
  }

  get cells(): Cell<Value>[] {
    return this.grid.flat();
  }

  getCell({row, col}: Coordinate): Cell<Value> {
    if (!this.cellExists({row, col}))
      throw new CellDoesNotExistInGridError(this, {row, col});

    return this.grid[row][col];
  }

  getRow(row: number): Row<Value> {
    return new Row<Value>(this, row);
  }

  get rows(): Row<Value>[] {
    const rows: Row<Value>[] = [];
    for (let row = 0; row < this.height; row++) {
      rows.push(new Row<Value>(this, row));
    }
    return rows;
  }

  getColumn(col: number): Column<Value> {
    return new Column<Value>(this, col);
  }

  get columns(): Column<Value>[] {
    const cols: Column<Value>[] = [];
    for (let col = 0; col < this.width; col++) {
      cols.push(new Column<Value>(this, col));
    }
    return cols;
  }

  clone(cloneValue: (value: Value) => Value = (value) => value): Grid<Value> {
    return new Grid({
      width: this.width,
      height: this.height,
      initializeCellValue: ({row, col}) => cloneValue(this.grid[row][col].value),
    });
  }
}
