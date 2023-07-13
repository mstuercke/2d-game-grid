import {Grid} from './Grid';
import {initializeGridOptionsFixture, preInitializedGridOptionsFixture} from './Grid.fixture';
import {Cell} from './Cell';

describe('Grid', () => {
  let grid: Grid<string>;

  beforeEach(() => {
    grid = new Grid<string>(preInitializedGridOptionsFixture);
  });

  describe('constructor', () => {
    it('should create grid', async () => {
      grid = new Grid<string>(initializeGridOptionsFixture);
      expect(toValues(grid.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ]);
    });

    it('should create grid with pre-initialized rows', async () => {
      grid = new Grid<string>(preInitializedGridOptionsFixture);
      expect(toValues(grid.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ]);
    });

    it('should throw error, when width is 0', async () => {
      expect(() => new Grid({width: 0, height: 1, initializeCellValue: () => null})).toThrowError();
      expect(() => new Grid({grid: [[]]})).toThrowError();
    });

    it('should throw error, when height is 0', async () => {
      expect(() => new Grid({width: 1, height: 0, initializeCellValue: () => null})).toThrowError();
      expect(() => new Grid({grid: []})).toThrowError();
    });
  });

  it('should get all cells', async () => {
    expect(grid.cells.map(cell => cell.value)).toEqual([
      '0-0', '0-1', '0-2', '0-3',
      '1-0', '1-1', '1-2', '1-3',
      '2-0', '2-1', '2-2', '2-3',
    ]);
  });

  it('should list rows', async () => {
    const rows = grid.rows;
    expect(rows.map(row => row.row)).toEqual([0, 1, 2]);
  });

  it('should list columns', async () => {
    const columns = grid.columns;
    expect(columns.map(col => col.col)).toEqual([0, 1, 2, 3]);
  });

  it('should get cell', async () => {
    const cell = grid.getCell({row: 1, col: 2});
    expect(cell.value).toEqual('1-2');
  });

  it.each`
    coordinate
    ${{row: -1, col: 0}}
    ${{row: 0, col: -1}}
    ${{row: 3, col: 0}}
    ${{row: 0, col: 4}}
    ${{row: -1, col: -1}}
    ${{row: 3, col: 3}}
`('should not get cell that is out of bounds ($coordinate)', async ({coordinate}) => {
    expect(() => grid.getCell(coordinate)).toThrowError();
  });

  describe('should clone', () => {
    it('with same values', async () => {
      const clone = grid.clone();
      expect(toValues(clone.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ]);
    });

    it('with manipulated values', async () => {
      const clone = grid.clone((value) => `${value} (clone)`);
      expect(toValues(clone.grid)).toEqual([
        ['0-0 (clone)', '0-1 (clone)', '0-2 (clone)', '0-3 (clone)'],
        ['1-0 (clone)', '1-1 (clone)', '1-2 (clone)', '1-3 (clone)'],
        ['2-0 (clone)', '2-1 (clone)', '2-2 (clone)', '2-3 (clone)'],
      ]);
    });
  });
});

function toValues<T>(grid: Cell<T>[][]): T[][] {
  return grid.map(row => row.map(cell => cell.value));
}
