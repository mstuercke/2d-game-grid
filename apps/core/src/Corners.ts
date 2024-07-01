import type {Grid} from './Grid'
import type {Direction} from './Direction'
import type {Cell} from './Cell'
import {Corner} from './Corner'

/**
 * The representation of all neighbors of a cell
 */
export abstract class Corners<
  Value,
  CellWithValue extends Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
  NeighborDirection extends Direction,
  EdgeDirection extends NeighborDirection,
  CornerDirection extends Direction,
> {
  /**
   * @param grid The grid the cell is part of
   * @param sourceCell The source cell
   */
  constructor(
    protected grid: Grid<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>,
    protected sourceCell: CellWithValue,
  ) {}

  /**
   * @param direction The direction to the corner
   * @returns The corner
   */
  get(direction: CornerDirection): Corner<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection> {
    const neighborCells = this.getNeighborDirections(direction)
      .map((direction) => this.sourceCell.neighbors.find(direction))
      .filter(Boolean) as CellWithValue[]
    return new Corner(this.sourceCell, direction, neighborCells)
  }

  protected abstract getNeighborDirections(cornerDirection: CornerDirection): NeighborDirection[]
}
