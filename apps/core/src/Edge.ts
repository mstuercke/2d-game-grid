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

  /**
   * @returns The same edge, but from the perspective of the neighbor cell. Returns undefined, if there is no neighbor cell
   */
  public getNeighborCellEdge():
    | Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>
    | undefined {
    return this.neighborCell?.edges.get(getOppositeDirection(this.direction)) as
      | Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>
      | undefined
  }

  /**
   * @param predicate
   * @returns All connected edges (for this cell only) that satisfy the predicate. Starting from the current edge.
   */
  public findConnectedCellEdges(
    predicate: (edge: Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>) => boolean,
  ): Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>[] {
    const path: Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>[] = [this]

    let nextEdge = this.getNextEdge()
    while (nextEdge.id !== this.id) {
      if (!predicate(nextEdge)) break

      path.push(nextEdge)
      // TODO: add neighbor
      nextEdge = nextEdge.getNextEdge()
    }

    let previousEdge = this.getPreviousEdge()
    while (previousEdge.id !== this.id) {
      if (!predicate(nextEdge)) break
      const pathEdgeIds = path.map((edge) => edge.id)
      if (pathEdgeIds.includes(previousEdge.id)) break
      if (predicate(previousEdge)) path.unshift(previousEdge)
      previousEdge = nextEdge.getPreviousEdge()
    }

    return path
  }

  /**
   * @param predicate
   * @returns All connected edges that satisfy the predicate. Starting from the current edge.
   */
  public findConnectedEdges(
    predicate: (edge: Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>) => boolean,
  ): Edge<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>[] {
    const path = this.findConnectedCellEdges(predicate)

    const oppositeEdges = path.map((edge) => edge.getNeighborCellEdge()).filter(Boolean) as Edge<
      Value,
      CellWithValue,
      NeighborDirection,
      EdgeDirection,
      CornerDirection
    >[]

    const neighborCellPaths = oppositeEdges.flatMap((edge) =>
      edge.findConnectedEdges((edge) => {
        const pathEdgeIds = path.map((edge) => edge.id)
        return pathEdgeIds.includes(edge.id) && predicate(edge)
      }),
    )

    return [...path, ...neighborCellPaths]
  }
}
