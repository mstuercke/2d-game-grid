import {Coordinate} from '../Coordinate';
import {Grid} from '../Grid';
import {Direction} from '../Direction';

/**
 * An error that is thrown when the neighbor does not exist in the grid
 */
export class NeighborDoesNotExistInGridError<Cell> extends Error {
  /**
   * @param grid The grid
   * @param coordinate The coordinate of the source cell
   * @param direction The direction to the not existing neighbor
   */
  constructor(grid: Grid<Cell>, coordinate: Coordinate, direction: Direction) {
    const {width, height} = grid;
    const {row, col} = coordinate;
    super(`Cell [row: ${row}, col: ${col}] has no ${direction} neighbor in grid [width: ${width}, height: ${height}]`);
  }
}
