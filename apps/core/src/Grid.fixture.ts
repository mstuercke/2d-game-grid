import {Grid, type InitializeGridOptions, type InitializeNewGridOptions, type PreInitializedGridOptions} from './Grid'
import type {Cell} from './Cell'
import type {Coordinate} from './Coordinate'
import {TestCell} from './Cell.fixture'

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

export class TestGrid extends Grid<string, Cell<string>> {
  constructor(options: InitializeNewGridOptions<string> | PreInitializedGridOptions<string>) {
    super(options)
    this.initialize((coordinate: Coordinate, value: string) => new TestCell(this, coordinate, value))
  }

  protected initializeGrid(options: InitializeGridOptions<string>): Grid<string, Cell<string>> {
    return new TestGrid(options)
  }
}