import type {Grid} from './Grid'
import type {Cell} from './Cell'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils'
import type {Direction} from './Direction'

/**
 * The row of a grid contains all information of the rows' cells
 */
export class Row<
  Value,
  CellWithValue extends Cell<Value, AllowedCellDirection, AllowedEdgeDirection>,
  AllowedCellDirection extends Direction,
  AllowedEdgeDirection extends AllowedCellDirection,
> {
  public readonly id: string
  private readonly _cells: CellWithValue[] = []
  private readonly eventDispatcher: GridEventDispatcher<Value, AllowedCellDirection, AllowedEdgeDirection>

  /**
   * @param grid The grid this row is part of
   * @param row The row coordinate inside the grid
   */
  constructor(
    private grid: Grid<Value, CellWithValue, AllowedCellDirection, AllowedEdgeDirection>,
    public row: number,
  ) {
    this.id = `row|${row}`
    for (let col = 0; col < this.grid.width; col++) {
      this.cells.push(this.getCell(col))
    }
    this.eventDispatcher = new GridEventDispatcher<Value, AllowedCellDirection, AllowedEdgeDirection>()
    const forwardEvent = (event: CellValueChangedEvent<Value, AllowedCellDirection, AllowedEdgeDirection>) =>
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
    callback: (event: CellValueChangedEvent<Value, AllowedCellDirection, AllowedEdgeDirection>) => void,
  ): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }
}
