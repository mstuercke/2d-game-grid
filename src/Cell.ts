import {Coordinate} from './Coordinate';
import {Neighbours} from './Neighbours';
import {Row} from './Row';
import {Column} from './Column';
import {DistanceAlgorithm} from './algorithms/distance/DistanceAlgorithm';
import {getDistance} from './algorithms/distance/getDistance';
import {Grid} from './Grid';
import {getPath} from './algorithms/pathfinding/getPath';
import {PathfindingOptions} from './algorithms/pathfinding/PathfindingOptions';

export class Cell<Value> {
  public readonly id: string;
  public readonly coordinate: Coordinate;
  protected readonly grid: Grid<Value>;
  private _value: Value;

  constructor(grid: Grid<Value>, coordinate: Coordinate, value: Value) {
    this.id = `cell|${coordinate.row}-${coordinate.col}`;
    this.grid = grid;
    this.coordinate = coordinate;
    this._value = value;
  }

  get value(): Value {
    return this._value;
  }

  set value(value: Value) {
    this._value = value;
  }

  get row(): Row<Value> {
    return this.grid.getRow(this.coordinate.row);
  }

  get column(): Column<Value> {
    return this.grid.getColumn(this.coordinate.col);
  }

  get neighbours(): Neighbours<Value> {
    return new Neighbours(this.grid, this.coordinate);
  }

  getDistance(target: Coordinate | Cell<Value>, algorithm: DistanceAlgorithm = 'MANHATTAN'): number {
    const end = 'coordinate' in target ? target.coordinate : target;
    return getDistance(this.coordinate, end, algorithm);
  }

  getPath(target: Coordinate | Cell<Value>, options?: PathfindingOptions<Value>): Cell<Value>[] {
    const end = 'coordinate' in target ? target.coordinate : target;
    return getPath(this.grid, this.coordinate, end, options);
  }

  clone(cloneValue: (value: Value) => Value = (value) => value): Cell<Value> {
    return new Cell<Value>(this.grid, this.coordinate, cloneValue(this.value));
  }
}
