import type {Cell} from './Cell'
import {mapShortCellId} from './utils/mapShortCellId'
import type {Directions} from './Directions'

export class Corner<TValue, TDirections extends Directions, TCell extends Cell<TValue, TDirections>> {
  public readonly id: string

  /**
   * All cells, that are connected to this corner
   */
  public adjacentCells: TCell[]

  /**
   * @param sourceCell
   * @param directionFromSourceCell
   * @param neighborCells All cells, that are connected to the sourceCell through this corner
   */
  constructor(
    public sourceCell: TCell,
    public directionFromSourceCell: TDirections['Corner'],
    public neighborCells: TCell[],
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
