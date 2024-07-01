import type {Cell} from '../Cell'
import type {Directions} from '../Directions'

/**
 * The event that will be created when the value of a cell was changed
 */
export type CellValueChangedEvent<TValue, TDirections extends Directions> = {
  /**
   * The cell which value has changed
   */
  cell: Cell<TValue, TDirections>

  /**
   * The cell value before the change
   */
  previousValue: TValue
}

/**
 * A class that implements this interface dispatches events about the grid
 */
export class GridEventDispatcher<Value, TDirections extends Directions> {
  public cellValueChangedListeners: ((event: CellValueChangedEvent<Value, TDirections>) => void)[] = []

  /**
   * @param callback A function that should be called, when a cell value changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(callback: (event: CellValueChangedEvent<Value, TDirections>) => void): () => void {
    this.cellValueChangedListeners.push(callback)
    return () => {
      this.cellValueChangedListeners = this.cellValueChangedListeners.filter((listener) => listener !== callback)
      return this.cellValueChangedListeners
    }
  }

  /**
   * @param event The event that should be dispatched to all registered callbacks
   */
  dispatchCellValueChangedEvent(event: CellValueChangedEvent<Value, TDirections>): void {
    for (const listener of this.cellValueChangedListeners) {
      listener(event)
    }
  }
}
