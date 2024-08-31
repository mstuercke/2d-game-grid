import type {Coordinate} from './Coordinate'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils'
import type {Row} from './Row'
import type {Column} from './Column'
import type {Neighbors} from './Neighbors'
import type {Edges} from './Edges'
import type {Corners} from './Corners'
import type {Directions} from './Directions'
import {createDeepOnChangeProxy} from './utils/createDeepOnChangeProxy'

/**
 * A Cell is part of a grid. It contains meta information like its coordinates inside the grid and the corresponding value.
 */
export abstract class Cell<TValue, TDirections extends Directions> implements Coordinate {
  public readonly id: string
  public readonly row: number
  public readonly col: number

  public abstract readonly neighbors: Neighbors<TValue, TDirections, Cell<TValue, TDirections>>
  public abstract readonly edges: Edges<TValue, TDirections, Cell<TValue, TDirections>>
  public abstract readonly corners: Corners<TValue, TDirections, Cell<TValue, TDirections>>

  private valueProxy: TValue
  private readonly eventDispatcher: GridEventDispatcher<TValue, TDirections>

  /**
   * @param coordinate The coordinate in the grid
   * @param value The value of the cell
   */
  protected constructor(coordinate: Coordinate, value: TValue) {
    this.id = `cell|${coordinate.row}-${coordinate.col}`
    this.row = coordinate.row
    this.col = coordinate.col
    this.valueProxy =
      value && typeof value === 'object'
        ? createDeepOnChangeProxy(value, () => this.eventDispatcher.dispatchCellValueChangedEvent({cell: this}))
        : value
    this.eventDispatcher = new GridEventDispatcher<TValue, TDirections>()
  }

  /**
   * @returns the value of the cell
   */
  get value(): TValue {
    return this.valueProxy
  }

  /**
   * Changes the value of the cell
   */
  set value(value: TValue) {
    this.valueProxy = value
    this.eventDispatcher.dispatchCellValueChangedEvent({cell: this})
  }

  /**
   * @param callback A function that should be called, when the cell value changes
   * @returns a function to unregister the callback
   */
  onValueChanged(callback: (event: CellValueChangedEvent<TValue, TDirections>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }

  /**
   * @returns The row of the cell
   */
  abstract getRow(): Row<TValue, TDirections, Cell<TValue, TDirections>>

  /**
   @returns The column of the cell
   */
  abstract getColumn(): Column<TValue, TDirections, Cell<TValue, TDirections>>

  /**
   * @param cloneValue A custom function to clone the value of this cell (defaults to copying the value)
   * @returns The cloned cell
   */
  abstract clone(cloneValue?: (value: TValue) => TValue): Cell<TValue, TDirections>
}
