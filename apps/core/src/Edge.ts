import type {Direction} from './Direction'
import type {Cell} from './Cell'
import type {Edges} from './Edges'
import {mapShortCellId} from './utils/mapShortCellId'

/**
 * The representation of an edge of a cell
 */
export class Edge<
  Value,
  CellWithValue extends Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
  NeighborDirection extends Direction,
  EdgeDirection extends NeighborDirection,
  CornerDirection extends Direction,
> {
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
    protected edges: Edges<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>,
    private getPreviousEdgeDirection: (direction: EdgeDirection) => EdgeDirection,
    private getNextEdgeDirection: (direction: EdgeDirection) => EdgeDirection,
    public sourceCell: CellWithValue,
    public direction: EdgeDirection,
    public neighborCell?: CellWithValue,
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
  public getPreviousEdge(): Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection> {
    return this.edges.get(this.getPreviousEdgeDirection(this.direction))
  }

  /**
   * @returns The next connected edge (e.g. for a square, the next edge of "top" would be "right")
   * @protected
   */
  public getNextEdge(): Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection> {
    return this.edges.get(this.getNextEdgeDirection(this.direction))
  }
}
