import type {Cell} from '../Cell'

/**
 * The event that will be created when the value of a cell was changed
 */
export interface CellValueChangedEvent<Value> {
  /**
   * The cell which value has changed
   */
  cell: Cell<Value>

  /**
   * The cell value before the change
   */
  previousValue: Value
}

/**
 * A class that implements this interface dispatches events about the grid
 */
export class GridEventDispatcher<Value> {
  public cellValueChangedListeners: ((event: CellValueChangedEvent<Value>) => void)[] = []

  /**
   * @param callback A function that should be called, when a cell value changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(callback: (event: CellValueChangedEvent<Value>) => void): () => void {
    this.cellValueChangedListeners.push(callback)
    return () => {
      this.cellValueChangedListeners = this.cellValueChangedListeners.filter((listener) => listener !== callback)
      return this.cellValueChangedListeners
    }
  }

  /**
   * @param event The event that should be dispatched to all registered callbacks
   */
  dispatchCellValueChangedEvent(event: CellValueChangedEvent<Value>): void {
    for (const listener of this.cellValueChangedListeners) {
      listener(event)
    }
  }
}
