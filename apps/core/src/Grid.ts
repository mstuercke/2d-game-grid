import type {Coordinate} from './Coordinate.js'
import {Row} from './Row.js'
import {Column} from './Column.js'
import {
  CellDoesNotExistInGridError,
  InvalidGridSizeError,
  UnequalGridHeightError,
  UnequalGridWidthError,
} from './errors/index.js'
import type {Cell} from './Cell.js'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils/index.js'
import type {StraightDirection} from './Direction.js'
import type {Directions} from './Directions.js'

/**
 * Options to generate a new grid
 */
export type InitializeNewGridOptions<Value> = {
  /**
   * The amount of columns (min: 1)
   */
  width: number

  /**
   * The amount of rows (min: 1)
   */
  height: number

  /**
   * The given function will be called, when the cell at {coordinate} will be initialized. The returned value will be the value of the cell.
   * @param coordinate The coordinate of the cell that is being initialized
   */
  initializeCellValue: (coordinate: Coordinate) => Value
}

/**
 * Options to generate a new grid based on an existing 2-dimensional array.
 */
export type PreInitializedGridOptions<Value> = {
  /**
   * The 2-dimensional array representing a grid (1. dimension: row (y-axis), 2. dimension: column (x-axis))
   */
  grid: Value[][]
}

export type InitializeGridOptions<Value> = InitializeNewGridOptions<Value> | PreInitializedGridOptions<Value>

/**
 * The grid contains all information about cells
 */
export abstract class Grid<TValue, TDirections extends Directions, TCell extends Cell<TValue, TDirections>> {
  readonly width: number
  readonly height: number

  private readonly _grid: TCell[][] = []
  private readonly _rows: Row<TValue, TDirections, TCell>[] = []
  private readonly _columns: Column<TValue, TDirections, TCell>[] = []
  private readonly eventDispatcher: GridEventDispatcher<TValue, TDirections> = new GridEventDispatcher<
    TValue,
    TDirections
  >()

  /**
   * @param options The initialization configuration
   */
  protected constructor(private options: InitializeGridOptions<TValue>) {
    if ('initializeCellValue' in this.options) {
      this.width = this.options.width
      this.height = this.options.height
    } else if ('grid' in this.options) {
      const rows = this.options.grid
      this.height = rows.length
      this.width = Math.max(0, ...rows.map((row) => row.length))
    } else {
      throw `Invalid options provided`
    }
  }

  protected initialize(initializeCell: (coordinate: Coordinate, value: TValue) => TCell) {
    if ('initializeCellValue' in this.options) {
      this._grid.push(...this.initializeCells(initializeCell, this.options.initializeCellValue))
    }

    if ('grid' in this.options) {
      const rows = this.options.grid
      this._grid.push(...this.initializeCells(initializeCell, ({row, col}) => rows[row][col]))
    }

    for (let row = 0; row < this.height; row++) {
      this._rows.push(new Row<TValue, TDirections, TCell>(this, row))
    }

    for (let col = 0; col < this.width; col++) {
      this._columns.push(new Column<TValue, TDirections, TCell>(this, col))
    }

    const forwardEvent = (event: CellValueChangedEvent<TValue, TDirections>) =>
      this.eventDispatcher.dispatchCellValueChangedEvent(event)
    for (const cell of this.cells) {
      cell.onValueChanged(forwardEvent)
    }
  }

  private initializeCells(
    initializeCell: (coordinate: Coordinate, value: TValue) => TCell,
    initializeCellValue: (coordinate: Coordinate) => TValue,
  ): TCell[][] {
    if (this.height === 0 || this.width === 0) throw new InvalidGridSizeError(this.width, this.height)

    const cells = new Array(this.height)
    for (let row = 0; row < this.height; row++) {
      cells[row] = new Array(this.width)
      for (let col = 0; col < this.width; col++) {
        const coordinate: Coordinate = {row, col}
        const value = initializeCellValue(coordinate)
        cells[row][col] = initializeCell(coordinate, value)
      }
    }
    return cells
  }

  /**
   * @returns The 2-dimensional array representing a grid (1. dimension: row (y-axis), 2. dimension: column (x-axis))
   */
  get grid(): TCell[][] {
    return this._grid
  }

  /**
   * @param coordinate The coordinate of the cell
   * @returns true if the cell exists in the grid
   */
  cellExists(coordinate: Coordinate): boolean {
    const {row, col} = coordinate
    return col >= 0 && row >= 0 && row < this.height && col < this.width
  }

  /**
   * @returns All cells in the grid in ascending order by row and column
   */
  get cells(): TCell[] {
    return this.grid.flat()
  }

  /**
   * @param coordinate The coordinate of the cell
   * @returns The cell
   * @throws {CellDoesNotExistInGridError} when the cell does not exist in the grid
   */
  getCell(coordinate: Coordinate): TCell {
    const cell = this.findCell(coordinate)
    if (!cell) throw new CellDoesNotExistInGridError(this, coordinate)
    return cell
  }

  /**
   * @param coordinate The coordinate of the cell
   * @returns The cell or undefined
   */
  findCell(coordinate: Coordinate): TCell | undefined {
    return this.grid[coordinate.row][coordinate.col]
  }

  /**
   * @param row The row coordinate
   * @returns The row
   */
  getRow(row: number): Row<TValue, TDirections, TCell> {
    return this._rows[row]
  }

  /**
   * @returns All rows of the grid in ascending order
   */
  get rows(): Row<TValue, TDirections, TCell>[] {
    return this._rows
  }

  /**
   * @param col The column coordinate
   * @returns The column
   */
  getColumn(col: number): Column<TValue, TDirections, TCell> {
    return this._columns[col]
  }

  /**
   * @returns All columns of the grid in ascending order
   */
  get columns(): Column<TValue, TDirections, TCell>[] {
    return this._columns
  }

  /**
   * @param callback A function that should be called, when a cell value of this grid changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(callback: (event: CellValueChangedEvent<TValue, TDirections>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }

  /**
   * @param gridToAdd The grid that should be added to this grid at the given direction
   * @param addDirection The direction at that the given grid should be placed
   * @returns a new grid
   */
  extend(gridToAdd: typeof this, addDirection: StraightDirection): typeof this {
    if ((addDirection === 'LEFT' || addDirection === 'RIGHT') && this.height !== gridToAdd.height)
      throw new UnequalGridHeightError(this.height, gridToAdd.height)

    if ((addDirection === 'TOP' || addDirection === 'BOTTOM') && this.width !== gridToAdd.width)
      throw new UnequalGridWidthError(this.width, gridToAdd.width)

    const extractValues = (row: Row<TValue, TDirections, TCell>) => row.cells.map((cell) => cell.value)

    switch (addDirection) {
      case 'TOP':
        return this.initializeGrid({
          grid: [...gridToAdd.rows.map(extractValues), ...this.rows.map(extractValues)],
        }) as typeof this

      case 'BOTTOM':
        return this.initializeGrid({
          grid: [...this.rows.map(extractValues), ...gridToAdd.rows.map(extractValues)],
        }) as typeof this

      case 'LEFT':
        return this.initializeGrid({
          grid: this.rows.map((row) => [...extractValues(gridToAdd.getRow(row.row)), ...extractValues(row)]),
        }) as typeof this

      case 'RIGHT':
        return this.initializeGrid({
          grid: this.rows.map((row) => [...extractValues(row), ...extractValues(gridToAdd.getRow(row.row))]),
        }) as typeof this
    }
  }

  /**
   * @param topLeft The coordinate of the top/left where the new grid should begin
   * @param bottomRight The coordinate of the bottom/right where the new grid should end
   * @returns a new grid
   */
  crop(topLeft: Coordinate, bottomRight: Coordinate): typeof this {
    const width = bottomRight.col - topLeft.col
    const height = bottomRight.row - topLeft.row
    if (width <= 0 || height <= 0) throw new InvalidGridSizeError(width, height)

    return this.initializeGrid({
      grid: this.rows
        .filter(({row}) => row >= topLeft.row)
        .filter(({row}) => row <= bottomRight.row)
        .map((row) => row.cells.filter(({col}) => col >= topLeft.col).filter(({col}) => col <= bottomRight.col))
        .map((cells) => cells.map((cell) => cell.value)),
    }) as typeof this
  }

  /**
   * @param cloneValue A custom function to clone the value of a cell (defaults to copying the value)
   * @returns The cloned grid
   */
  clone(cloneValue: (value: TValue) => TValue = (value) => value): typeof this {
    return this.initializeGrid({
      width: this.width,
      height: this.height,
      initializeCellValue: ({row, col}) => cloneValue(this.grid[row][col].value),
    }) as typeof this
  }

  protected abstract initializeGrid(options: InitializeGridOptions<TValue>): Grid<TValue, TDirections, TCell>
}
