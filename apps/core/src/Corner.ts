import type {Cell} from './Cell'
import type {Direction} from './Direction'

export class Corner<
  Value,
  CellWithValue extends Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
  AllowedNeighborDirection extends Direction,
  AllowedEdgeDirection extends AllowedNeighborDirection,
  AllowedCornerDirection extends Direction,
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
    public directionFromSourceCell: AllowedCornerDirection,
    public neighborCells: CellWithValue[],
  ) {
    this.adjacentCells = [this.sourceCell, ...this.neighborCells]

    const neighborCellIds = this.neighborCells
      .map((adjacentCell) => this.mapShortCellId(adjacentCell))
      .filter(Boolean) as string[]

    const cellIds =
      neighborCellIds.length > 0
        ? [this.mapShortCellId(sourceCell), ...neighborCellIds].toSorted().join('|')
        : [this.mapShortCellId(sourceCell), directionFromSourceCell].join('|')

    this.id = `corner[${cellIds}]`
  }

  private mapShortCellId(cell: CellWithValue): string {
    return `${cell.row}-${cell.col}`
  }
}
