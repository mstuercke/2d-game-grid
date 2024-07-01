import type {Coordinate} from './Coordinate'
import {type CellValueChangedEvent, GridEventDispatcher} from './utils'
import type {Row} from './Row'
import type {Column} from './Column'
import type {Direction} from './Direction'
import type {Neighbors} from './Neighbors'
import type {Edges} from './Edges'
import type {Corners} from './Corners'

/**
 * A Cell is part of a grid. It contains meta information like its coordinates inside the grid and the corresponding value.
 */
export abstract class Cell<
  Value,
  NeighborDirection extends Direction,
  EdgeDirection extends NeighborDirection,
  CornerDirection extends Direction,
> implements Coordinate
{
  public readonly id: string
  public readonly row: number
  public readonly col: number

  public abstract readonly neighbors: Neighbors<
    Value,
    Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
    NeighborDirection,
    EdgeDirection,
    CornerDirection
  >
  public abstract readonly edges: Edges<
    Value,
    Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
    NeighborDirection,
    EdgeDirection,
    CornerDirection
  >
  public abstract readonly corners: Corners<
    Value,
    Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
    NeighborDirection,
    EdgeDirection,
    CornerDirection
  >

  private _value: Value
  private readonly eventDispatcher: GridEventDispatcher<Value, NeighborDirection, EdgeDirection, CornerDirection>

  /**
   * @param coordinate The coordinate in the grid
   * @param value The value of the cell
   */
  protected constructor(coordinate: Coordinate, value: Value) {
    this.id = `cell|${coordinate.row}-${coordinate.col}`
    this.row = coordinate.row
    this.col = coordinate.col
    this._value = value
    this.eventDispatcher = new GridEventDispatcher<Value, NeighborDirection, EdgeDirection, CornerDirection>()
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
  onValueChanged(
    callback: (event: CellValueChangedEvent<Value, NeighborDirection, EdgeDirection, CornerDirection>) => void,
  ): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }

  /**
   * @returns The row of the cell
   */
  abstract getRow(): Row<
    Value,
    Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
    NeighborDirection,
    EdgeDirection,
    CornerDirection
  >

  /**
   @returns The column of the cell
   */
  abstract getColumn(): Column<
    Value,
    Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>,
    NeighborDirection,
    EdgeDirection,
    CornerDirection
  >

  /**
   * @param cloneValue A custom function to clone the value of this cell (defaults to copying the value)
   * @returns The cloned cell
   */
  abstract clone(cloneValue?: (value: Value) => Value): Cell<Value, NeighborDirection, EdgeDirection, CornerDirection>
}
