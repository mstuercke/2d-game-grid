import type {Grid} from './Grid'
import type {Cell} from './Cell'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils'
import type {Direction} from './Direction'

/**
 * The row of a grid contains all information of the rows' cells
 */
export class Row<
  Value,
  CellWithValue extends Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
  NeighborDirection extends Direction,
  EdgeDirection extends NeighborDirection,
  CornerDirection extends Direction,
> {
  public readonly id: string
  private readonly _cells: CellWithValue[] = []
  private readonly eventDispatcher: GridEventDispatcher<Value, NeighborDirection, EdgeDirection, CornerDirection>

  /**
   * @param grid The grid this row is part of
   * @param row The row coordinate inside the grid
   */
  constructor(
    private grid: Grid<Value, CellWithValue, NeighborDirection, EdgeDirection, CornerDirection>,
    public row: number,
  ) {
    this.id = `row|${row}`
    for (let col = 0; col < this.grid.width; col++) {
      this.cells.push(this.getCell(col))
    }
    this.eventDispatcher = new GridEventDispatcher<Value, NeighborDirection, EdgeDirection, CornerDirection>()
    const forwardEvent = (event: CellValueChangedEvent<Value, NeighborDirection, EdgeDirection, CornerDirection>) =>
      this.eventDispatcher.dispatchCellValueChangedEvent(event)
    for (const cell of this.cells) {
      cell.onValueChanged(forwardEvent)
    }
  }

  /**
   * @returns all cells of this row
   */
  get cells(): CellWithValue[] {
    return this._cells
  }

  /**
   * @param col The column coordinate of the grid
   * @returns A cell
   */
  getCell(col: number): CellWithValue {
    return this.grid.getCell({row: this.row, col})
  }

  /**
   * @param callback A function that should be called, when a cell value of this row changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(
    callback: (event: CellValueChangedEvent<Value, NeighborDirection, EdgeDirection, CornerDirection>) => void,
  ): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }
}
