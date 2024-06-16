import type {Coordinate} from '../Coordinate'
import type {Grid} from '../Grid'
import type {Cell} from '../Cell'
import type {Direction} from '../Direction'

/**
 * An error that is thrown when the cell does not exist in the grid
 */
export class CellDoesNotExistInGridError<
  Value,
  CellWithValue extends Cell<Value, AllowedCellDirection, AllowedEdgeDirection>,
  AllowedCellDirection extends Direction,
  AllowedEdgeDirection extends AllowedCellDirection,
> extends Error {
  readonly type = CellDoesNotExistInGridError.name

  /**
   * @param grid The grid
   * @param coordinate The coordinate of the not existing cell
   */
  constructor(grid: Grid<Value, CellWithValue, AllowedCellDirection, AllowedEdgeDirection>, coordinate: Coordinate) {
    const {width, height} = grid
    const {row, col} = coordinate
    super(`Cell [row: ${row}, col: ${col}] does not exist in grid [width: ${width}, height: ${height}]`)
  }
}
