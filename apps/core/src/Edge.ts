import type {Direction} from './Direction'
import type {Cell} from './Cell'
import type {Edges} from './Edges'

/**
 * The representation of an edge of a cell
 */
export class Edge<
  Value,
  CellWithValue extends Cell<Value, AllowedCellDirection, AllowedEdgeDirection>,
  AllowedCellDirection extends Direction,
  AllowedEdgeDirection extends AllowedCellDirection = AllowedCellDirection,
> {
  public id: string

  /**
   * @param edges The edges instance
   * @param getPreviousEdgeDirection
   * @param getNextEdgeDirection
   * @param sourceCell
   * @param direction
   * @param adjacentCell
   */
  constructor(
    protected edges: Edges<Value, CellWithValue, AllowedCellDirection, AllowedEdgeDirection>,
    private getPreviousEdgeDirection: (direction: AllowedEdgeDirection) => AllowedEdgeDirection,
    private getNextEdgeDirection: (direction: AllowedEdgeDirection) => AllowedEdgeDirection,
    public sourceCell: Cell<Value, AllowedCellDirection, AllowedEdgeDirection>,
    public direction: AllowedEdgeDirection,
    public adjacentCell?: Cell<Value, AllowedCellDirection, AllowedEdgeDirection>,
  ) {
    const cellIds = adjacentCell
      ? [sourceCell.id, adjacentCell.id].toSorted().join(':')
      : [sourceCell.id, direction].join(':')

    this.id = `edge[${cellIds}]`
  }

  /**
   * @returns The previous connected edge (e.g. for a square, the previous edge of "top" would be "left")
   * @protected
   */
  public getPreviousEdge(): Edge<Value, CellWithValue, AllowedCellDirection, AllowedEdgeDirection> {
    return this.edges.get(this.getPreviousEdgeDirection(this.direction))
  }

  /**
   * @returns The next connected edge (e.g. for a square, the next edge of "top" would be "right")
   * @protected
   */
  public getNextEdge(): Edge<Value, CellWithValue, AllowedCellDirection, AllowedEdgeDirection> {
    return this.edges.get(this.getNextEdgeDirection(this.direction))
  }
}
