import type {Coordinate} from '../Coordinate.js'
import type {Grid} from '../Grid.js'
import type {Cell} from '../Cell.js'
import type {Directions} from '../Directions.js'

/**
 * An error that is thrown when the cell does not exist in the grid
 */
export class CellDoesNotExistInGridError<
  TValue,
  TDirections extends Directions,
  TCell extends Cell<TValue, TDirections>,
> extends Error {
  readonly type = CellDoesNotExistInGridError.name

  /**
   * @param grid The grid
   * @param coordinate The coordinate of the not existing cell
   */
  constructor(grid: Grid<TValue, TDirections, TCell>, coordinate: Coordinate) {
    const {width, height} = grid
    const {row, col} = coordinate
    super(`Cell [row: ${row}, col: ${col}] does not exist in grid [width: ${width}, height: ${height}]`)
  }
}
