import type {Cell} from '../Cell'
import type {Direction} from '../Direction'

/**
 * The event that will be created when the value of a cell was changed
 */
export interface CellValueChangedEvent<
  Value,
  NeighborDirection extends Direction,
  EdgeDirection extends NeighborDirection,
  CornerDirection extends Direction,
> {
  /**
   * The cell which value has changed
   */
  cell: Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>

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
  NeighborDirection extends Direction,
  EdgeDirection extends NeighborDirection,
  CornerDirection extends Direction,
> {
  public cellValueChangedListeners: ((
    event: CellValueChangedEvent<Value, NeighborDirection, EdgeDirection, CornerDirection>,
  ) => void)[] = []

  /**
   * @param callback A function that should be called, when a cell value changes
   * @returns a function to unregister the callback
   */
  onCellValueChanged(
    callback: (event: CellValueChangedEvent<Value, NeighborDirection, EdgeDirection, CornerDirection>) => void,
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
  dispatchCellValueChangedEvent(
    event: CellValueChangedEvent<Value, NeighborDirection, EdgeDirection, CornerDirection>,
  ): void {
    for (const listener of this.cellValueChangedListeners) {
      listener(event)
    }
  }
}
