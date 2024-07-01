import {Grid, type InitializeGridOptions, type InitializeNewGridOptions, type PreInitializedGridOptions} from './Grid'
import type {Coordinate} from './Coordinate'
import {TestCell} from './Cell.fixture'
import type {TestDirections} from './Directions.fixture'

export const preInitializedGridOptionsFixture: PreInitializedGridOptions<string> = {
  grid: [
    ['0-0', '0-1', '0-2', '0-3'],
    ['1-0', '1-1', '1-2', '1-3'],
    ['2-0', '2-1', '2-2', '2-3'],
  ],
}

export const initializeGridOptionsFixture: InitializeNewGridOptions<string> = {
  width: 4,
  height: 3,
  initializeCellValue: ({row, col}) => `${row}-${col}`,
}

export class TestGrid extends Grid<string, TestDirections, TestCell> {
  constructor(options: InitializeNewGridOptions<string> | PreInitializedGridOptions<string> = preInitializedGridOptionsFixture) {
    super(options)
    this.initialize((coordinate: Coordinate, value: string) => new TestCell(this, coordinate, value))
  }

  protected initializeGrid(options: InitializeGridOptions<string>): Grid<string, TestDirections, TestCell> {
    return new TestGrid(options)
  }
}
