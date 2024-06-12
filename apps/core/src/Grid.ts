import type {Coordinate} from './Coordinate'
import {Row} from './Row'
import {Column} from './Column'
import {CellDoesNotExistInGridError, InvalidGridSizeError} from './errors'
import type {Cell} from './Cell'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils'

/**
 * Options to generate a new grid
 */
export interface InitializeGridOptions<Value> {
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
export interface PreInitializedGridOptions<Value> {
  /**
   * The 2-dimensional array representing a grid (1. dimension: row (y-axis), 2. dimension: column (x-axis))
   */
  grid: Value[][]
}

/**
 * The grid contains all information about cells
 */
export class Grid<Value, CellWithValue extends Cell<Value>> {
  readonly width: number
  readonly height: number

  private readonly _grid: CellWithValue[][] = []
  private readonly _rows: Row<Value, CellWithValue>[] = []
  private readonly _columns: Column<Value, CellWithValue>[] = []
  private readonly eventDispatcher: GridEventDispatcher<Value> = new GridEventDispatcher<Value>()

  /**
   * @param options The initialization configuration
   * @param initializeCell This function will initialize a cell
   */
  constructor(
    private options: InitializeGridOptions<Value> | PreInitializedGridOptions<Value>,
    private initializeCell: (coordinate: Coordinate, value: Value) => CellWithValue,
  ) {
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

  protected initializeGrid() {
    if ('initializeCellValue' in this.options) {
      this._grid.push(...this.initializeCells(this.options.initializeCellValue))
    }

    if ('grid' in this.options) {
      const rows = this.options.grid
      this._grid.push(...this.initializeCells(({row, col}) => rows[row][col]))
    }

    for (let row = 0; row < this.height; row++) {
      this._rows.push(new Row<Value, CellWithValue>(this, row))
    }

    for (let col = 0; col < this.width; col++) {
      this._columns.push(new Column<Value, CellWithValue>(this, col))
    }

    const forwardEvent = (event: CellValueChangedEvent<Value>) =>
      this.eventDispatcher.dispatchCellValueChangedEvent(event)
    for (const cell of this.cells) {
      cell.onValueChanged(forwardEvent)
    }
  }

  private initializeCells(initializeCellValue: (coordinate: Coordinate) => Value): CellWithValue[][] {
    if (this.height === 0 || this.width === 0) throw new InvalidGridSizeError(this.width, this.height)

    const cells = new Array(this.height)
    for (let row = 0; row < this.height; row++) {
      cells[row] = new Array(this.width)
      for (let col = 0; col < this.width; col++) {
        const coordinate: Coordinate = {row, col}
        const value = initializeCellValue(coordinate)
        cells[row][col] = this.initializeCell(coordinate, value)
      }
    }
    return cells
  }

  /**
   * @returns The 2-dimensional array representing a grid (1. dimension: row (y-axis), 2. dimension: column (x-axis))
   */
  get grid(): CellWithValue[][] {
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
  get cells(): CellWithValue[] {
    return this.grid.flat()
  }

  /**
   * @param coordinate The coordinate of the cell
   * @returns The cell
   * @throws {CellDoesNotExistInGridError} when the cell does not exist in the grid
   */
  getCell(coordinate: Coordinate): CellWithValue {
    if (!this.cellExists(coordinate)) throw new CellDoesNotExistInGridError(this, coordinate)

    return this.grid[coordinate.row][coordinate.col]
  }

  /**
   * @param row The row coordinate
   * @returns The row
   */
  getRow(row: number): Row<Value, CellWithValue> {
    return this._rows[row]
  }

  /**
   * @returns All rows of the grid in ascending order
   */
  get rows(): Row<Value, CellWithValue>[] {
    return this._rows
  }

  /**
   * @param col The column coordinate
   * @returns The column
   */
  getColumn(col: number): Column<Value, CellWithValue> {
    return this._columns[col]
  }

  /**
   * @returns All columns of the grid in ascending order
   */
  get columns(): Column<Value, CellWithValue>[] {
    return this._columns
  }

  /**
   * @param callback A function that should be called, when a cell value of this grid changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(callback: (event: CellValueChangedEvent<Value>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }
}
