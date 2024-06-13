import {
  type Coordinate,
  Grid,
  type InitializeGridOptions,
  InvalidGridSizeError,
  type PreInitializedGridOptions,
  type Row,
  type StraightDirection,
} from '@2d-game-grid/core'
import {FlatTopHexagonCell} from './FlatTopHexagonCell'
import {UnequalGridHeightError, UnequalGridWidthError} from '../errors'

export class FlatTopHexagonGrid<Value> extends Grid<Value, FlatTopHexagonCell<Value>> {
  constructor(options: InitializeGridOptions<Value> | PreInitializedGridOptions<Value>) {
    super(options, (coordinate, value) => new FlatTopHexagonCell<Value>(this, coordinate, value))
    this.initializeGrid()
  }

  /**
   * @param gridToAdd The grid that should be added to this grid at the given direction
   * @param addDirection The direction at that the given grid should be placed
   * @returns a new grid
   */
  extend(gridToAdd: FlatTopHexagonGrid<Value>, addDirection: StraightDirection): FlatTopHexagonGrid<Value> {
    if ((addDirection === 'LEFT' || addDirection === 'RIGHT') && this.height !== gridToAdd.height)
      throw new UnequalGridHeightError(this.height, gridToAdd.height)

    if ((addDirection === 'TOP' || addDirection === 'BOTTOM') && this.width !== gridToAdd.width)
      throw new UnequalGridWidthError(this.width, gridToAdd.width)

    const extractValues = (row: Row<Value, FlatTopHexagonCell<Value>>) => row.cells.map((cell) => cell.value)

    switch (addDirection) {
      case 'TOP':
        return new FlatTopHexagonGrid<Value>({
          grid: [...gridToAdd.rows.map(extractValues), ...this.rows.map(extractValues)],
        })

      case 'BOTTOM':
        return new FlatTopHexagonGrid<Value>({
          grid: [...this.rows.map(extractValues), ...gridToAdd.rows.map(extractValues)],
        })

      case 'LEFT':
        return new FlatTopHexagonGrid<Value>({
          grid: this.rows.map((row) => [...extractValues(gridToAdd.getRow(row.row)), ...extractValues(row)]),
        })

      case 'RIGHT':
        return new FlatTopHexagonGrid<Value>({
          grid: this.rows.map((row) => [...extractValues(row), ...extractValues(gridToAdd.getRow(row.row))]),
        })
    }
  }

  /**
   * @param topLeft The coordinate of the top/left where the new grid should begin
   * @param bottomRight The coordinate of the bottom/right where the new grid should end
   * @returns a new grid
   */
  crop(topLeft: Coordinate, bottomRight: Coordinate): FlatTopHexagonGrid<Value> {
    const width = bottomRight.col - topLeft.col
    const height = bottomRight.row - topLeft.row
    if (width <= 0 || height <= 0) throw new InvalidGridSizeError(width, height)

    return new FlatTopHexagonGrid<Value>({
      grid: this.rows
        .filter(({row}) => row >= topLeft.row)
        .filter(({row}) => row <= bottomRight.row)
        .map((row) => row.cells.filter(({col}) => col >= topLeft.col).filter(({col}) => col <= bottomRight.col))
        .map((cells) => cells.map((cell) => cell.value)),
    })
  }

  /**
   * @param cloneValue A custom function to clone the value of a cell (defaults to copying the value)
   * @returns The cloned grid
   */
  clone(cloneValue: (value: Value) => Value = (value) => value): FlatTopHexagonGrid<Value> {
    return new FlatTopHexagonGrid({
      width: this.width,
      height: this.height,
      initializeCellValue: ({row, col}) => cloneValue(this.grid[row][col].value),
    })
  }
}
