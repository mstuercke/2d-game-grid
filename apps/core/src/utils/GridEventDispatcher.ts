import type {Cell} from '../Cell'
import type {Direction} from '../Direction'

/**
 * The event that will be created when the value of a cell was changed
 */
export interface CellValueChangedEvent<
  Value,
  AllowedCellDirection extends Direction,
  AllowedEdgeDirection extends AllowedCellDirection,
> {
  /**
   * The cell which value has changed
   */
  cell: Cell<Value, AllowedCellDirection, AllowedEdgeDirection>

  /**
   * The cell value before the change
   */
  previousValue: Value
}

/**
 * A class that implements this interface dispatches events about the grid
 */
export class GridEventDispatcher<
  Value,
  AllowedCellDirection extends Direction,
  AllowedEdgeDirection extends AllowedCellDirection,
> {
  public cellValueChangedListeners: ((
    event: CellValueChangedEvent<Value, AllowedCellDirection, AllowedEdgeDirection>,
  ) => void)[] = []

  /**
   * @param callback A function that should be called, when a cell value changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(
    callback: (event: CellValueChangedEvent<Value, AllowedCellDirection, AllowedEdgeDirection>) => void,
  ): () => void {
    this.cellValueChangedListeners.push(callback)
    return () => {
      this.cellValueChangedListeners = this.cellValueChangedListeners.filter((listener) => listener !== callback)
      return this.cellValueChangedListeners
    }
  }

  /**
   * @param event The event that should be dispatched to all registered callbacks
   */
  dispatchCellValueChangedEvent(event: CellValueChangedEvent<Value, AllowedCellDirection, AllowedEdgeDirection>): void {
    for (const listener of this.cellValueChangedListeners) {
      listener(event)
    }
  }
}
