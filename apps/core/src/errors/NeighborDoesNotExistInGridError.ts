import type {Grid} from '../Grid'
import type {Coordinate} from '../Coordinate'
import type {Direction} from '../Direction'
import type {Cell} from '../Cell'
import type {Directions} from '../Directions'

/**
 * An error that is thrown when the neighbor does not exist in the grid
 */
export class NeighborDoesNotExistInGridError<
  TValue,
  TDirections extends Directions,
  TCell extends Cell<TValue, TDirections>,
> extends Error {
  readonly type = NeighborDoesNotExistInGridError.name

  /**
   * @param grid The grid
   * @param coordinate The coordinate of the source cell
   * @param direction The direction to the not existing neighbor
   */
  constructor(grid: Grid<TValue, TDirections, TCell>, coordinate: Coordinate, direction: Direction) {
    const {width, height} = grid
    const {row, col} = coordinate
    super(`Cell [row: ${row}, col: ${col}] has no ${direction} neighbor in grid [width: ${width}, height: ${height}]`)
  }
}
