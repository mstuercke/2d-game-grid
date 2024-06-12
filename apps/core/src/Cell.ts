import type {Coordinate} from './Coordinate'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils'

/**
 * A Cell is part of a grid. It contains meta information like its coordinates inside the grid and the corresponding value.
 */
export class Cell<Value> implements Coordinate {
  public readonly id: string
  public readonly row: number
  public readonly col: number

  private _value: Value
  private readonly eventDispatcher: GridEventDispatcher<Value>

  /**
   *
   * @param coordinate The coordinate in the grid
   * @param value The value of the cell
   */
  constructor(coordinate: Coordinate, value: Value) {
    this.id = `cell|${coordinate.row}-${coordinate.col}`
    this.row = coordinate.row
    this.col = coordinate.col
    this._value = value
    this.eventDispatcher = new GridEventDispatcher<Value>()
  }

  /**
   * @returns the value of the cell
   */
  get value(): Value {
    return this._value
  }

  /**
   * Changes the value of the cell
   */
  set value(value: Value) {
    const previousValue = this._value
    this._value = value
    this.eventDispatcher.dispatchCellValueChangedEvent({cell: this, previousValue})
  }

  /**
   * @param callback A function that should be called, when the cell value changes
   * @returns a function to unregister the callback
   */
  onValueChanged(callback: (event: CellValueChangedEvent<Value>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }
}
