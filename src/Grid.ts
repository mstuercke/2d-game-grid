import {Coordinate} from './Coordinate';
import {Row} from './Row';
import {Column} from './Column';
import {CellDoesNotExistInGridError, InvalidGridSizeError} from './errors';
import {Cell} from './Cell';

/**
 * Options to generate a new grid
 */
export interface InitializeGridOptions<Value> {
  /**
   * The amount of columns (min: 1)
   */
  width: number,

  /**
   * The amount of rows (min: 1)
   */
  height: number,

  /**
   * The given function will be called, when the cell at {coordinate} will be initialized. The returned value will be the value of the cell.
   * @param coordinate The coordinate of the cell that is being initialized
   */
  initializeCellValue: (coordinate: Coordinate) => Value
}

/**
 * Options to generate a new grid based on an existing 2-dimensional array.
 */
export interface PreInitializedGridOptions<Value> {
  /**
   * The 2-dimensional array representing a grid (1. dimension: row (y-axis), 2. dimension: column (x-axis))
   */
  grid: Value[][];
}

/**
 * The grid contains all information about cells
 */
export class Grid<Value> {
  readonly width: number;
  readonly height: number;
  readonly grid: Cell<Value>[][];

  /**
   * @param options The initialization configuration
   */
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

  /**
   * @param coordinate The coordinate of the cell
   * @returns true if the cell exists in the grid
   */
  cellExists(coordinate: Coordinate): boolean {
    const {row, col} = coordinate;
    return col >= 0
        && row >= 0
        && row < this.height
        && col < this.width;
  }

  /**
   * @returns All cells in the grid
   */
  get cells(): Cell<Value>[] {
    return this.grid.flat();
  }

  /**
   * @param coordinate The coordinate of the cell
   * @returns The cell
   * @throws {CellDoesNotExistInGridError} when the cell does not exist in the grid
   */
  getCell(coordinate: Coordinate): Cell<Value> {
    if (!this.cellExists(coordinate))
      throw new CellDoesNotExistInGridError(this, coordinate);

    return this.grid[coordinate.row][coordinate.col];
  }

  /**
   * @param row The row coordinate
   * @returns The row
   */
  getRow(row: number): Row<Value> {
    return new Row<Value>(this, row);
  }

  /**
   * @returns All rows of the grid
   */
  get rows(): Row<Value>[] {
    const rows: Row<Value>[] = [];
    for (let row = 0; row < this.height; row++) {
      rows.push(new Row<Value>(this, row));
    }
    return rows;
  }

  /**
   * @param col The column coordinate
   * @returns The column
   */
  getColumn(col: number): Column<Value> {
    return new Column<Value>(this, col);
  }

  /**
   * @returns All columns of the grid
   */
  get columns(): Column<Value>[] {
    const cols: Column<Value>[] = [];
    for (let col = 0; col < this.width; col++) {
      cols.push(new Column<Value>(this, col));
    }
    return cols;
  }

  /**
   * @param cloneValue A custom function to clone the value of a cell (defaults to copying the value)
   * @returns The cloned grid
   */
  clone(cloneValue: (value: Value) => Value = (value) => value): Grid<Value> {
    return new Grid({
      width: this.width,
      height: this.height,
      initializeCellValue: ({row, col}) => cloneValue(this.grid[row][col].value),
    });
  }
}
