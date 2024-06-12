import type {Grid} from './Grid'
import type {Cell} from './Cell'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils'

/**
 * The row of a grid contains all information of the rows' cells
 */
export class Row<Value, CellWithValue extends Cell<Value>> {
  public readonly id: string
  private readonly _cells: CellWithValue[] = []
  private readonly eventDispatcher: GridEventDispatcher<Value>

  /**
   * @param grid The grid this row is part of
   * @param row The row coordinate inside the grid
   */
  constructor(
    private grid: Grid<Value, CellWithValue>,
    public row: number,
  ) {
    this.id = `row|${row}`
    for (let col = 0; col < this.grid.width; col++) {
      this.cells.push(this.getCell(col))
    }
    this.eventDispatcher = new GridEventDispatcher<Value>()
    const forwardEvent = (event: CellValueChangedEvent<Value>) =>
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
  onCellValueChanged(callback: (event: CellValueChangedEvent<Value>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }
}
