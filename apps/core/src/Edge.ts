import type {Cell} from './Cell'
import type {Edges} from './Edges'
import {mapShortCellId} from './utils/mapShortCellId'
import type {Directions} from './Directions'

/**
 * The representation of an edge of a cell
 */
export class Edge<TValue, TDirections extends Directions, TCell extends Cell<TValue, TDirections>> {
  public id: string

  /**
   * @param edges The edges instance
   * @param getPreviousEdgeDirection
   * @param getNextEdgeDirection
   * @param sourceCell
   * @param direction
   * @param neighborCell
   */
  constructor(
    protected edges: Edges<TValue, TDirections, TCell>,
    private getPreviousEdgeDirection: (direction: TDirections['Edge']) => TDirections['Edge'],
    private getNextEdgeDirection: (direction: TDirections['Edge']) => TDirections['Edge'],
    public sourceCell: TCell,
    public direction: TDirections['Edge'],
    public neighborCell?: TCell,
  ) {
    const cellIds = neighborCell
      ? [mapShortCellId(sourceCell), mapShortCellId(neighborCell)].toSorted().join('|')
      : [mapShortCellId(sourceCell), direction].join('|')

    this.id = `edge[${cellIds}]`
  }

  /**
   * @returns The previous connected edge (e.g. for a square, the previous edge of "top" would be "left")
   * @protected
   */
  public getPreviousEdge(): Edge<TValue, TDirections, TCell> {
    return this.edges.get(this.getPreviousEdgeDirection(this.direction))
  }

  /**
   * @returns The next connected edge (e.g. for a square, the next edge of "top" would be "right")
   * @protected
   */
  public getNextEdge(): Edge<TValue, TDirections, TCell> {
    return this.edges.get(this.getNextEdgeDirection(this.direction))
  }
}
