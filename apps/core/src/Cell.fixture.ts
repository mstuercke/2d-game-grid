import {Cell} from './Cell'
import type {Column} from './Column'
import type {Row} from './Row'
import type {Coordinate} from './Coordinate'
import type {TestGrid} from './Grid.fixture'

export class TestCell extends Cell<string> {
  constructor(
    private grid: TestGrid,
    coordinate: Coordinate,
    value: string,
  ) {
    super(coordinate, value)
  }
  getRow(): Row<string, Cell<string>> {
    return this.grid.getRow(this.row)
  }

  getColumn(): Column<string, Cell<string>> {
    return this.grid.getColumn(this.col)
  }

  clone(cloneValue: (value: string) => string = (value) => value): TestCell {
    return new TestCell(this.grid, this, cloneValue(this.value))
  }
}
