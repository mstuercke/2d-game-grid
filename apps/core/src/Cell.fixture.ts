import {Cell} from './Cell'
import type {Column} from './Column'
import type {Row} from './Row'
import type {Coordinate} from './Coordinate'
import type {TestGrid} from './Grid.fixture'
import type {Edges} from './Edges'
import {TestNeighbors} from './Neighbors.fixture'
import {TestEdges} from './Edges.fixture'
import type {Neighbors} from './Neighbors'
import type {TestEdgeDirection} from './Direction.fixture'

type AllowedCellDirection = 'LEFT' | 'RIGHT'

export class TestCell extends Cell<string, AllowedCellDirection, TestEdgeDirection> {
  public readonly neighbors: Neighbors<string, Cell<string, AllowedCellDirection, TestEdgeDirection>, AllowedCellDirection, TestEdgeDirection>
  public readonly edges: Edges<string, Cell<string, AllowedCellDirection, TestEdgeDirection>, AllowedCellDirection>

  constructor(
    private grid: TestGrid,
    coordinate: Coordinate,
    value: string,
  ) {
    super(coordinate, value)

    this.neighbors = new TestNeighbors(this.grid, this)
    this.edges = new TestEdges(this.grid, this)
  }
  getRow(): Row<string, Cell<string, AllowedCellDirection, TestEdgeDirection>, AllowedCellDirection, TestEdgeDirection> {
    return this.grid.getRow(this.row)
  }

  getColumn(): Column<string, Cell<string, AllowedCellDirection, TestEdgeDirection>, AllowedCellDirection, TestEdgeDirection> {
    return this.grid.getColumn(this.col)
  }

  clone(cloneValue: (value: string) => string = (value) => value): TestCell {
    return new TestCell(this.grid, this, cloneValue(this.value))
  }
}
