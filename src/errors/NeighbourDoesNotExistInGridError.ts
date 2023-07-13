import {Coordinate} from '../Coordinate';
import {Grid} from '../Grid';
import {Direction} from '../Direction';

/**
 * An error that is thrown when the neighbour does not exist in the grid
 */
export class NeighbourDoesNotExistInGridError<Cell> extends Error {
  /**
   * @param grid The grid
   * @param coordinate The coordinate of the source cell
   * @param direction The direction to the not existing neighbour
   */
  constructor(grid: Grid<Cell>, coordinate: Coordinate, direction: Direction) {
    const {width, height} = grid;
    const {row, col} = coordinate;
    super(`Cell [row: ${row}, col: ${col}] has no ${direction} neighbour in grid [width: ${width}, height: ${height}]`);
  }
}
