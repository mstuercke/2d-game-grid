import {InitializeGridOptions, PreInitializedGridOptions} from './Grid';

export const preInitializedGridOptionsFixture: PreInitializedGridOptions<string> = {
  grid: [
    ['0-0', '0-1', '0-2'],
    ['1-0', '1-1', '1-2'],
    ['2-0', '2-1', '2-2'],
  ],
};

export const initializeGridOptionsFixture: InitializeGridOptions<string> = {
  width: 3,
  height: 3,
  initializeCellValue: ({row, col}) => `${row}-${col}`,
};
