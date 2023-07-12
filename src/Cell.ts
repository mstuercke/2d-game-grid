import {Coordinate} from './Coordinate';
import {Neighbours} from './Neighbours';
import {Row} from './Row';
import {Column} from './Column';
import {DistanceAlgorithm, PathfindingOptions} from './algorithms';
import {getDistance} from './algorithms/distance/getDistance';
import {Grid} from './Grid';
import {getPath} from './algorithms/pathfinding/getPath';

export class Cell<Value> implements Coordinate {
  public readonly id: string;
  public readonly row: number;
  public readonly col: number;
  protected readonly grid: Grid<Value>;
  private _value: Value;

  constructor(grid: Grid<Value>, coordinate: Coordinate, value: Value) {
    this.id = `cell|${coordinate.row}-${coordinate.col}`;
    this.grid = grid;
    this.row = coordinate.row;
    this.col = coordinate.col;
    this._value = value;
  }

  get value(): Value {
    return this._value;
  }

  set value(value: Value) {
    this._value = value;
  }

  getRow(): Row<Value> {
    return this.grid.getRow(this.row);
  }

  getColumn(): Column<Value> {
    return this.grid.getColumn(this.col);
  }

  get neighbours(): Neighbours<Value> {
    return new Neighbours(this.grid, this);
  }

  getDistance(target: Coordinate, algorithm: DistanceAlgorithm = 'MANHATTAN'): number {
    return getDistance(this, target, algorithm);
  }

  getPath(target: Coordinate, options?: PathfindingOptions<Value>): Cell<Value>[] {
    return getPath(this.grid, this, target, options);
  }

  clone(cloneValue: (value: Value) => Value = (value) => value): Cell<Value> {
    return new Cell<Value>(this.grid, this, cloneValue(this.value));
  }
}
