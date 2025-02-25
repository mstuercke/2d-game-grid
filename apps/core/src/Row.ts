import type {Grid} from './Grid.js'
import type {Cell} from './Cell.js'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils/index.js'
import type {Directions} from './Directions.js'

/**
 * The row of a grid contains all information of the rows' cells
 */
export class Row<TValue, TDirections extends Directions, TCell extends Cell<TValue, TDirections>> {
  public readonly id: string
  private readonly _cells: TCell[] = []
  private readonly eventDispatcher: GridEventDispatcher<TValue, TDirections>

  /**
   * @param grid The grid this row is part of
   * @param row The row coordinate inside the grid
   */
  constructor(
    private grid: Grid<TValue, TDirections, TCell>,
    public row: number,
  ) {
    this.id = `row|${row}`
    for (let col = 0; col < this.grid.width; col++) {
      this.cells.push(this.getCell(col))
    }
    this.eventDispatcher = new GridEventDispatcher<TValue, TDirections>()
    const forwardEvent = (event: CellValueChangedEvent<TValue, TDirections>) =>
      this.eventDispatcher.dispatchCellValueChangedEvent(event)
    for (const cell of this.cells) {
      cell.onValueChanged(forwardEvent)
    }
  }

  /**
   * @returns all cells of this row
   */
  get cells(): TCell[] {
    return this._cells
  }

  /**
   * @param col The column coordinate of the grid
   * @returns A cell
   */
  getCell(col: number): TCell {
    return this.grid.getCell({row: this.row, col})
  }

  /**
   * @param callback A function that should be called, when a cell value of this row changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(callback: (event: CellValueChangedEvent<TValue, TDirections>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }
}
