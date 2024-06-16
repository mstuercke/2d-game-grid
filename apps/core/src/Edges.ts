import type {Grid} from './Grid'
import type {Direction} from './Direction'
import type {Cell} from './Cell'
import {Edge} from './Edge'

/**
 * The representation of all neighbors of a cell
 */
export abstract class Edges<
  Value,
  CellWithValue extends Cell<Value, AllowedCellDirection, AllowedEdgeDirection>,
  AllowedCellDirection extends Direction,
  AllowedEdgeDirection extends AllowedCellDirection = AllowedCellDirection,
> {
  /**
   * @param grid The grid the cell is part of
   * @param cell The source cell
   */
  constructor(
    protected grid: Grid<Value, CellWithValue, AllowedCellDirection, AllowedEdgeDirection>,
    protected cell: Cell<Value, AllowedCellDirection, AllowedEdgeDirection>,
  ) {}

  /**
   * @param direction The direction to the edge
   * @returns The edge
   */
  get(direction: AllowedEdgeDirection): Edge<Value, CellWithValue, AllowedCellDirection, AllowedEdgeDirection> {
    const neighbor = this.findNeighbor(direction)
    return new Edge(this, this.getPreviousEdgeDirection, this.getNextEdgeDirection, this.cell, direction, neighbor)
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing edge cells (output order is the same as the input order)
   */
  list(directions: AllowedEdgeDirection[]): Edge<Value, CellWithValue, AllowedCellDirection, AllowedEdgeDirection>[] {
    return directions.map((direction) => this.get(direction))
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The neighbor cell or undefined
   */
  protected abstract findNeighbor(direction: AllowedCellDirection): CellWithValue | undefined

  /**
   * @param direction The direction of the edge
   * @returns The direction to the previous connected edge (e.g. for a square, the previous edge of "top" would be "left")
   * @protected
   */
  protected abstract getPreviousEdgeDirection(direction: AllowedEdgeDirection): AllowedEdgeDirection

  /**
   * @param direction The direction of the edge
   * @returns The direction to the next connected edge (e.g. for a square, the previous edge of "top" would be "right")
   * @protected
   */
  protected abstract getNextEdgeDirection(direction: AllowedEdgeDirection): AllowedEdgeDirection
}
