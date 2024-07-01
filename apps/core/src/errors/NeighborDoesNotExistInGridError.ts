import type {Grid} from '../Grid'
import type {Coordinate} from '../Coordinate'
import type {Direction} from '../Direction'
import type {Cell} from '../Cell'

/**
 * An error that is thrown when the neighbor does not exist in the grid
 */
export class NeighborDoesNotExistInGridError<
  Value,
  CellWithValue extends Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
  AllowedNeighborDirection extends Direction,
  AllowedEdgeDirection extends AllowedNeighborDirection,
  AllowedCornerDirection extends Direction,
> extends Error {
  readonly type = NeighborDoesNotExistInGridError.name

  /**
   * @param grid The grid
   * @param coordinate The coordinate of the source cell
   * @param direction The direction to the not existing neighbor
   */
  constructor(
    grid: Grid<Value, CellWithValue, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
    coordinate: Coordinate,
    direction: Direction,
  ) {
    const {width, height} = grid
    const {row, col} = coordinate
    super(`Cell [row: ${row}, col: ${col}] has no ${direction} neighbor in grid [width: ${width}, height: ${height}]`)
  }
}
