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
  AllowedNeighborDirection extends Direction,
  AllowedEdgeDirection extends AllowedNeighborDirection,
  AllowedCornerDirection extends Direction,
> implements Coordinate
{
  public readonly id: string
  public readonly row: number
  public readonly col: number

  public abstract readonly neighbors: Neighbors<
    Value,
    Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
    AllowedNeighborDirection,
    AllowedEdgeDirection,
    AllowedCornerDirection
  >
  public abstract readonly edges: Edges<
    Value,
    Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
    AllowedNeighborDirection,
    AllowedEdgeDirection,
    AllowedCornerDirection
  >
  public abstract readonly corners: Corners<
    Value,
    Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
    AllowedNeighborDirection,
    AllowedEdgeDirection,
    AllowedCornerDirection
  >

  private _value: Value
  private readonly eventDispatcher: GridEventDispatcher<
    Value,
    AllowedNeighborDirection,
    AllowedEdgeDirection,
    AllowedCornerDirection
  >

  /**
   * @param coordinate The coordinate in the grid
   * @param value The value of the cell
   */
  protected constructor(coordinate: Coordinate, value: Value) {
    this.id = `cell|${coordinate.row}-${coordinate.col}`
    this.row = coordinate.row
    this.col = coordinate.col
    this._value = value
    this.eventDispatcher = new GridEventDispatcher<
      Value,
      AllowedNeighborDirection,
      AllowedEdgeDirection,
      AllowedCornerDirection
    >()
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
    callback: (
      event: CellValueChangedEvent<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
    ) => void,
  ): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }

  /**
   * @returns The row of the cell
   */
  abstract getRow(): Row<
    Value,
    Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
    AllowedNeighborDirection,
    AllowedEdgeDirection,
    AllowedCornerDirection
  >

  /**
   @returns The column of the cell
   */
  abstract getColumn(): Column<
    Value,
    Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
    AllowedNeighborDirection,
    AllowedEdgeDirection,
    AllowedCornerDirection
  >

  /**
   * @param cloneValue A custom function to clone the value of this cell (defaults to copying the value)
   * @returns The cloned cell
   */
  abstract clone(
    cloneValue?: (value: Value) => Value,
  ): Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>
}
