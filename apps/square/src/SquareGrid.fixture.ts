import type {InitializeNewGridOptions, PreInitializedGridOptions} from '@2d-game-grid/core'

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
