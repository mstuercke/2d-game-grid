import {Grid, type InitializeGridOptions, type PreInitializedGridOptions} from './Grid'
import {Cell} from './Cell'
import type {Coordinate} from './Coordinate'

export const preInitializedGridOptionsFixture: PreInitializedGridOptions<string> = {
  grid: [
    ['0-0', '0-1', '0-2', '0-3'],
    ['1-0', '1-1', '1-2', '1-3'],
    ['2-0', '2-1', '2-2', '2-3'],
  ],
}

export const initializeGridOptionsFixture: InitializeGridOptions<string> = {
  width: 4,
  height: 3,
  initializeCellValue: ({row, col}) => `${row}-${col}`,
}

export const initializeCellFixture = <Value>(coordinate: Coordinate, value: Value) => {
  return new Cell<Value>(coordinate, value)
}

export class TestGrid extends Grid<string, Cell<string>> {
  constructor(options: InitializeGridOptions<string> | PreInitializedGridOptions<string>) {
    super(options, initializeCellFixture)
    this.initializeGrid()
  }
}
