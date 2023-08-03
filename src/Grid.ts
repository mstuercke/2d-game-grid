import {Coordinate} from './Coordinate';
import {Row} from './Row';
import {Column} from './Column';
import {
  CellDoesNotExistInGridError,
  InvalidGridSizeError,
  UnequalGridHeightError,
  UnequalGridWidthError,
} from './errors';
import {Cell} from './Cell';
import {CellValueChangedEvent, GridEventDispatcher} from './utils/GridEventDispatcher';
import {StraightDirection} from './Direction';

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

  private readonly _rows: Row<Value>[] = [];
  private readonly _columns: Column<Value>[] = [];
  private readonly eventDispatcher: GridEventDispatcher<Value>;

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

    for (let row = 0; row < this.height; row++) {
      this._rows.push(new Row<Value>(this, row));
    }

    for (let col = 0; col < this.width; col++) {
      this._columns.push(new Column<Value>(this, col));
    }

    this.eventDispatcher = new GridEventDispatcher<Value>();
    const forwardEvent = (event: CellValueChangedEvent<Value>) => this.eventDispatcher.dispatchCellValueChangedEvent(event);
    this.cells.forEach(cell => cell.onValueChanged(forwardEvent));
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
   * @returns All cells in the grid in ascending order by row and column
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
    return this._rows[row];
  }

  /**
   * @returns All rows of the grid in ascending order
   */
  get rows(): Row<Value>[] {
    return this._rows;
  }

  /**
   * @param col The column coordinate
   * @returns The column
   */
  getColumn(col: number): Column<Value> {
    return this._columns[col];
  }

  /**
   * @returns All columns of the grid in ascending order
   */
  get columns(): Column<Value>[] {
    return this._columns;
  }

  /**
   * @param callback A function that should be called, when a cell value of this grid changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(callback: (event: CellValueChangedEvent<Value>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback);
  }

  /**
   * @param gridToAdd The grid that should be added to this grid at the given direction
   * @param addDirection The direction at that the given grid should be placed
   * @returns a new grid
   */
  extend(gridToAdd: Grid<Value>, addDirection: StraightDirection): Grid<Value> {
    if ((addDirection === 'LEFT' || addDirection === 'RIGHT') && this.height !== gridToAdd.height)
      throw new UnequalGridHeightError(this.height, gridToAdd.height);

    if ((addDirection === 'TOP' || addDirection === 'BOTTOM') && this.width !== gridToAdd.width)
      throw new UnequalGridWidthError(this.width, gridToAdd.width);

    const extractValues = (row: Row<Value>) => row.cells.map(cell => cell.value);

    switch (addDirection) {
      case 'TOP':
        return new Grid<Value>({
          grid: [
            ...gridToAdd.rows.map(extractValues),
            ...this.rows.map(extractValues),
          ],
        });

      case 'BOTTOM':
        return new Grid<Value>({
          grid: [
            ...this.rows.map(extractValues),
            ...gridToAdd.rows.map(extractValues),
          ],
        });

      case 'LEFT':
        return new Grid<Value>({
          grid: this.rows.map((row) => [
            ...extractValues(gridToAdd.getRow(row.row)),
            ...extractValues(row),
          ]),
        });

      case 'RIGHT':
        return new Grid<Value>({
          grid: this.rows.map((row) => [
            ...extractValues(row),
            ...extractValues(gridToAdd.getRow(row.row)),
          ]),
        });
    }
  }

  /**
   * @param topLeft The coordinate of the top/left where the new grid should begin
   * @param bottomRight The coordinate of the bottom/right where the new grid should end
   * @returns a new grid
   */
  crop(topLeft: Coordinate, bottomRight: Coordinate): Grid<Value> {
    const width = bottomRight.col - topLeft.col;
    const height = bottomRight.row - topLeft.row;
    if (width <= 0 || height <= 0)
      throw new InvalidGridSizeError(width, height);

    return new Grid<Value>({
      grid: this.rows
          .filter(({row}) => row >= topLeft.row)
          .filter(({row}) => row <= bottomRight.row)
          .map(row => row.cells
              .filter(({col}) => col >= topLeft.col)
              .filter(({col}) => col <= bottomRight.col))
          .map(cells => cells.map(cell => cell.value)),
    });
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
