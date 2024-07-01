import type {Cell} from './Cell'
import type {Direction} from './Direction'
import {mapShortCellId} from './utils/mapShortCellId'

export class Corner<
  Value,
  CellWithValue extends Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
  NeighborDirection extends Direction,
  EdgeDirection extends NeighborDirection,
  CornerDirection extends Direction,
> {
  public readonly id: string

  /**
   * All cells, that are connected to this corner
   */
  public adjacentCells: CellWithValue[]

  /**
   * @param sourceCell
   * @param directionFromSourceCell
   * @param neighborCells All cells, that are connected to the sourceCell through this corner
   */
  constructor(
    public sourceCell: CellWithValue,
    public directionFromSourceCell: CornerDirection,
    public neighborCells: CellWithValue[],
  ) {
    this.adjacentCells = [this.sourceCell, ...this.neighborCells]

    const neighborCellIds = this.neighborCells
      .map((adjacentCell) => mapShortCellId(adjacentCell))
      .filter(Boolean) as string[]

    const cellIds =
      neighborCellIds.length > 0
        ? [mapShortCellId(sourceCell), ...neighborCellIds].toSorted().join('|')
        : [mapShortCellId(sourceCell), directionFromSourceCell].join('|')

    this.id = `corner[${cellIds}]`
  }
}
