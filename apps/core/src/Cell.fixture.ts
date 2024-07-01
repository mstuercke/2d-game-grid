import {Cell} from './Cell'
import type {Column} from './Column'
import type {Row} from './Row'
import type {Coordinate} from './Coordinate'
import type {TestGrid} from './Grid.fixture'
import type {Edges} from './Edges'
import {TestNeighbors} from './Neighbors.fixture'
import {TestEdges} from './Edges.fixture'
import type {Neighbors} from './Neighbors'
import type {Corners} from './Corners'
import {TestCorners} from './Corners.fixture'
import type {TestDirections} from './Directions.fixture'

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
