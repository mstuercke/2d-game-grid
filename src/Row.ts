import {Grid} from './Grid';
import {Cell} from './Cell';
import {CellValueChangedEvent, GridEventDispatcher} from './utils/GridEventDispatcher';

/**
 * The row of a grid contains all information of the rows' cells
 */
export class Row<Value> {
  public readonly id: string;
  private readonly _cells: Cell<Value>[] = [];
  private readonly eventDispatcher: GridEventDispatcher<Value>;

  /**
   * @param grid The grid this row is part of
   * @param row The row coordinate inside the grid
   */
  constructor(private grid: Grid<Value>, public row: number) {
    this.id = `row|${row}`;
    for (let col = 0; col < this.grid.width; col++) {
      this.cells.push(this.getCell(col));
    }
    this.eventDispatcher = new GridEventDispatcher<Value>();
    const forwardEvent = (event: CellValueChangedEvent<Value>) => this.eventDispatcher.dispatchCellValueChangedEvent(event);
    this.cells.forEach(cell => cell.onValueChanged(forwardEvent));
  }

  /**
   * @returns all cells of this row
   */
  get cells(): Cell<Value>[] {
    return this._cells;
  }

  /**
   * @param col The column coordinate of the grid
   * @returns A cell
   */
  getCell(col: number): Cell<Value> {
    return this.grid.getCell({row: this.row, col});
  }

  /**
   * @param callback A function that should be called, when a cell value of this row changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(callback: (event: CellValueChangedEvent<Value>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback);
  }
}
