import type {Grid} from './Grid.js'
import type {Cell} from './Cell.js'
import {Corner} from './Corner.js'
import type {Directions} from './Directions.js'

/**
 * The representation of all neighbors of a cell
 */
export abstract class Corners<TValue, TDirections extends Directions, TCell extends Cell<TValue, TDirections>> {
  /**
   * @param grid The grid the cell is part of
   * @param sourceCell The source cell
   */
  constructor(
    protected grid: Grid<TValue, TDirections, TCell>,
    protected sourceCell: TCell,
  ) {}

  /**
   * @param direction The direction to the corner
   * @returns The corner
   */
  get(direction: TDirections['Corner']): Corner<TValue, TDirections, TCell> {
    const neighborCells = this.getNeighborDirections(direction)
      .map((direction) => this.sourceCell.neighbors.find(direction))
      .filter(Boolean) as TCell[]
    return new Corner(this.sourceCell, direction, neighborCells)
  }

  protected abstract getNeighborDirections(cornerDirection: TDirections['Corner']): TDirections['Neighbor'][]
}
