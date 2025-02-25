import type {Grid} from './Grid.js'
import type {Cell} from './Cell.js'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils/index.js'
import type {Directions} from './Directions.js'

/**
 * The column of a grid contains all information of the columns' cells
 */
export class Column<TValue, TDirections extends Directions, TCell extends Cell<TValue, TDirections>> {
  public readonly id: string
  private readonly _cells: TCell[] = []
  private readonly eventDispatcher: GridEventDispatcher<TValue, TDirections>

  /**
   * @param grid The grid this column is part of
   * @param col The column coordinate inside the grid
   */
  constructor(
    private grid: Grid<TValue, TDirections, TCell>,
    public col: number,
  ) {
    this.id = `column|${col}`

    for (let row = 0; row < this.grid.height; row++) {
      this.cells.push(this.getCell(row))
    }
    this.eventDispatcher = new GridEventDispatcher<TValue, TDirections>()
    const forwardEvent = (event: CellValueChangedEvent<TValue, TDirections>) =>
      this.eventDispatcher.dispatchCellValueChangedEvent(event)
    for (const cell of this.cells) {
      cell.onValueChanged(forwardEvent)
    }
  }

  /**
   * @returns all cells of this column
   */
  get cells(): TCell[] {
    return this._cells
  }

  /**
   * @param row The row coordinate of the grid
   * @returns A cell
   */
  getCell(row: number): TCell {
    return this.grid.getCell({col: this.col, row})
  }

  /**
   * @param callback A function that should be called, when a cell value of this column changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(callback: (event: CellValueChangedEvent<TValue, TDirections>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }
}
