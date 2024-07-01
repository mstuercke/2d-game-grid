import type {Grid} from './Grid'
import type {Direction} from './Direction'
import type {Cell} from './Cell'
import {Edge} from './Edge'

/**
 * The representation of all neighbors of a cell
 */
export abstract class Edges<
  Value,
  CellWithValue extends Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
  NeighborDirection extends Direction,
  EdgeDirection extends NeighborDirection,
  CornerDirection extends Direction,
> {
  /**
   * @param grid The grid the cell is part of
   * @param cell The source cell
   */
  constructor(
    protected grid: Grid<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>,
    protected cell: CellWithValue,
  ) {}

  /**
   * @param direction The direction to the edge
   * @returns The edge
   */
  get(direction: EdgeDirection): Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection> {
    const neighbor = this.findNeighbor(direction)
    return new Edge(this, this.getPreviousEdgeDirection, this.getNextEdgeDirection, this.cell, direction, neighbor)
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing edge cells (output order is the same as the input order)
   */
  list(directions: EdgeDirection[]): Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>[] {
    return directions.map((direction) => this.get(direction))
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The neighbor cell or undefined
   */
  protected abstract findNeighbor(direction: NeighborDirection): CellWithValue | undefined

  /**
   * @param direction The direction of the edge
   * @returns The direction to the previous connected edge (counterclockwise)
   * @protected
   */
  protected abstract getPreviousEdgeDirection(direction: EdgeDirection): EdgeDirection

  /**
   * @param direction The direction of the edge
   * @returns The direction to the next connected edge (clockwise)
   * @protected
   */
  protected abstract getNextEdgeDirection(direction: EdgeDirection): EdgeDirection
}
