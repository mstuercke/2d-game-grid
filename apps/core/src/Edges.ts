import type {Grid} from './Grid'
import type {Cell} from './Cell'
import {Edge} from './Edge'
import type {Directions} from './Directions'

/**
 * The representation of all neighbors of a cell
 */
export abstract class Edges<TValue, TDirections extends Directions, TCell extends Cell<TValue, TDirections>> {
  /**
   * @param grid The grid the cell is part of
   * @param cell The source cell
   */
  constructor(
    protected grid: Grid<TValue, TDirections, TCell>,
    protected cell: TCell,
  ) {}

  /**
   * @param direction The direction to the edge
   * @returns The edge
   */
  get(direction: TDirections['Edge']): Edge<TValue, TDirections, TCell> {
    const neighbor = this.findNeighbor(direction)
    return new Edge(this, this.getPreviousEdgeDirection, this.getNextEdgeDirection, this.cell, direction, neighbor)
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing edge cells (output order is the same as the input order)
   */
  list(directions: TDirections['Edge'][]): Edge<TValue, TDirections, TCell>[] {
    return directions.map((direction) => this.get(direction))
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The neighbor cell or undefined
   */
  protected abstract findNeighbor(direction: TDirections['Neighbor']): TCell | undefined

  /**
   * @param direction The direction of the edge
   * @returns The direction to the previous connected edge (counterclockwise)
   * @protected
   */
  protected abstract getPreviousEdgeDirection(direction: TDirections['Edge']): TDirections['Edge']

  /**
   * @param direction The direction of the edge
   * @returns The direction to the next connected edge (clockwise)
   * @protected
   */
  protected abstract getNextEdgeDirection(direction: TDirections['Edge']): TDirections['Edge']
}
