import {Cell} from './Cell.js'
import type {Column} from './Column.js'
import type {Row} from './Row.js'
import type {Coordinate} from './Coordinate.js'
import type {TestGrid} from './Grid.fixture.js'
import type {Edges} from './Edges.js'
import {TestNeighbors} from './Neighbors.fixture.js'
import {TestEdges} from './Edges.fixture.js'
import type {Neighbors} from './Neighbors.js'
import type {Corners} from './Corners.js'
import {TestCorners} from './Corners.fixture.js'
import type {TestDirections} from './Directions.fixture.js'

export class TestCell extends Cell<string, TestDirections> {
  public readonly neighbors: Neighbors<string, TestDirections, TestCell>
  public readonly edges: Edges<string, TestDirections, TestCell>
  public readonly corners: Corners<string, TestDirections, TestCell>

  constructor(
    private grid: TestGrid,
    coordinate: Coordinate,
    value: string,
  ) {
    super(coordinate, value)

    this.neighbors = new TestNeighbors(this.grid, this)
    this.edges = new TestEdges(this.grid, this)
    this.corners = new TestCorners(this.grid, this)
  }

  getRow(): Row<string, TestDirections, TestCell> {
    return this.grid.getRow(this.row)
  }

  getColumn(): Column<string, TestDirections, TestCell> {
    return this.grid.getColumn(this.col)
  }

  clone(cloneValue: (value: string) => string = (value) => value): TestCell {
    return new TestCell(this.grid, this, cloneValue(this.value))
  }
}

export class GenericTestCell<TValue> extends Cell<TValue, TestDirections> {
  public get neighbors(): never {
    throw 'Not implemented'
  }

  public get edges(): never {
    throw 'Not implemented'
  }

  public get corners(): never {
    throw 'Not implemented'
  }

  // biome-ignore lint/complexity/noUselessConstructor: it is necessary as the Cell class has a protected constructor
  constructor(coordinate: Coordinate, value: TValue) {
    super(coordinate, value)
  }

  getRow(): never {
    throw 'Not implemented'
  }

  getColumn(): never {
    throw 'Not implemented'
  }

  clone(): never {
    throw 'Not implemented'
  }
}
