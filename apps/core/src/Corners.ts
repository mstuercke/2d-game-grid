import type {Grid} from './Grid'
import type {Direction} from './Direction'
import type {Cell} from './Cell'
import {Corner} from './Corner'

/**
 * The representation of all neighbors of a cell
 */
export abstract class Corners<
  Value,
  CellWithValue extends Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
  AllowedNeighborDirection extends Direction,
  AllowedEdgeDirection extends AllowedNeighborDirection,
  AllowedCornerDirection extends Direction,
> {
  /**
   * @param grid The grid the cell is part of
   * @param sourceCell The source cell
   */
  constructor(
    protected grid: Grid<Value, CellWithValue, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
    protected sourceCell: CellWithValue,
  ) {}

  /**
   * @param direction The direction to the corner
   * @returns The corner
   */
  get(
    direction: AllowedCornerDirection,
  ): Corner<Value, CellWithValue, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection> {
    const neighborCells = this.getNeighborDirections(direction)
      .map((direction) => this.sourceCell.neighbors.find(direction))
      .filter(Boolean) as CellWithValue[]
    return new Corner(this.sourceCell, direction, neighborCells)
  }

  protected abstract getNeighborDirections(cornerDirection: AllowedCornerDirection): AllowedNeighborDirection[]
}
