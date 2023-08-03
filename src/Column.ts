import {Grid} from './Grid';
import {Cell} from './Cell';
import {GridEventDispatcher, CellValueChangedEvent} from './utils/GridEventDispatcher';

/**
 * The column of a grid contains all information of the columns' cells
 */
export class Column<Value> {
  public readonly id: string;
  private readonly _cells: Cell<Value>[] = [];
  private readonly eventDispatcher: GridEventDispatcher<Value>;

  /**
   * @param grid The grid this column is part of
   * @param col The column coordinate inside the grid
   */
  constructor(private grid: Grid<Value>, public col: number) {
    this.id = `column|${col}`;

    for (let row = 0; row < this.grid.height; row++) {
      this.cells.push(this.getCell(row));
    }
    this.eventDispatcher = new GridEventDispatcher<Value>();
    const forwardEvent = (event: CellValueChangedEvent<Value>) => this.eventDispatcher.dispatchCellValueChangedEvent(event);
    this.cells.forEach(cell => cell.onValueChanged(forwardEvent));
  }

  /**
   * @returns all cells of this column
   */
  get cells(): Cell<Value>[] {
    return this._cells;
  }

  /**
   * @param row The row coordinate of the grid
   * @returns A cell
   */
  getCell(row: number): Cell<Value> {
    return this.grid.getCell({col: this.col, row});
  }

  /**
   * @param callback A function that should be called, when a cell value of this column changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(callback: (event: CellValueChangedEvent<Value>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback);
  }
}
