import {Grid} from './Grid';
import {Neighbours} from './Neighbours';
import {Coordinate} from './Coordinate';
import {getDistance} from './algorithms/distance/getDistance';
import {gridOptionsFixture, preInitializedGridOptionsFixture} from './Grid.fixture';

jest.mock('./Neighbours');
const NeighboursMock = jest.mocked(Neighbours);

jest.mock('./algorithms/distance/getDistance');
const getDistanceMock = jest.mocked(getDistance);

describe('Grid', () => {
  let grid: Grid<string>;

  beforeEach(() => {
    grid = new Grid<string>(preInitializedGridOptionsFixture);
  });

  describe('constructor', () => {
    it('should create grid', async () => {
      grid = new Grid<string>(gridOptionsFixture);
      expect(grid.cells).toEqual([
        ['0-0', '0-1', '0-2'],
        ['1-0', '1-1', '1-2'],
        ['2-0', '2-1', '2-2'],
      ]);
    });

    it('should create grid with pre-initialized rows', async () => {
      grid = new Grid<string>(preInitializedGridOptionsFixture);
      expect(grid.cells).toEqual([
        ['0-0', '0-1', '0-2'],
        ['1-0', '1-1', '1-2'],
        ['2-0', '2-1', '2-2'],
      ]);
    });

    it('should throw error, when width is 0', async () => {
      expect(() => new Grid({width: 0, height: 1, initializeCell: () => null})).toThrowError();
      expect(() => new Grid({rows: [[]]})).toThrowError();
    });

    it('should throw error, when height is 0', async () => {
      expect(() => new Grid({width: 1, height: 0, initializeCell: () => null})).toThrowError();
      expect(() => new Grid({rows: []})).toThrowError();
    });
  });

  it('should get all cells', async () => {
    const cells = grid.listCells();
    expect(cells).toEqual([
      '0-0', '0-1', '0-2',
      '1-0', '1-1', '1-2',
      '2-0', '2-1', '2-2',
    ]);
  });

  it('should list rows', async () => {
    const rows = grid.listRows();
    expect(rows.map(row => row.row)).toEqual([0, 1, 2]);
  });

  it('should list columns', async () => {
    const columns = grid.listColumns();
    expect(columns.map(col => col.col)).toEqual([0, 1, 2]);
  });

  it('should get cell', async () => {
    const cell = grid.getCell({row: 1, col: 2});
    expect(cell).toEqual('1-2');
  });

  it('should set cell', async () => {
    const coordinates = {row: 1, col: 2};
    grid.setCell(coordinates, 'foo');
    expect(grid.getCell(coordinates)).toEqual('foo');
  });

  it.each`
    coordinate
    ${{row: -1, col: 0}}
    ${{row: 0, col: -1}}
    ${{row: 3, col: 0}}
    ${{row: 0, col: 3}}
    ${{row: -1, col: -1}}
    ${{row: 3, col: 3}}
`('should not get cell that is out of bounds ($coordinate)', async ({coordinate}) => {
    expect(() => grid.getCell(coordinate)).toThrowError();
  });

  it.each`
    coordinate
    ${{row: -1, col: 0}}
    ${{row: 0, col: -1}}
    ${{row: 3, col: 0}}
    ${{row: 0, col: 3}}
    ${{row: -1, col: -1}}
    ${{row: 3, col: 3}}
`('should not set cell that is out of bounds ($coordinate)', async () => {
    const coordinates = {row: 1, col: 3};
    expect(() => grid.setCell(coordinates, 'foo')).toThrowError();
  });

  it('should initialize Neighbours', async () => {
    const coordinate: Coordinate = {row: 1, col: 2};
    const neighbours = {} as Neighbours<null>;
    NeighboursMock.mockReturnValueOnce(neighbours);

    const response = grid.getNeighbours(coordinate);

    expect(NeighboursMock).toHaveBeenCalledWith(grid, coordinate);
    expect(response).toBe(neighbours);
  });

  it.each`
    passedAlgorithm | usedAlgorithm 
    ${undefined}    | ${'MANHATTAN'}
    ${'MANHATTAN'}  | ${'MANHATTAN'} 
    ${'EUCLIDEAN'}  | ${'EUCLIDEAN'}
  `('should get distance', async ({passedAlgorithm, usedAlgorithm}) => {
    getDistanceMock.mockReturnValueOnce(7);
    const start: Coordinate = {row: 1, col: 2};
    const end: Coordinate = {row: 2, col: 2};

    const distance = grid.getCellDistance(start, end, passedAlgorithm);

    expect(getDistanceMock).toHaveBeenCalledWith(start, end, usedAlgorithm);
    expect(distance).toEqual(7);
  });

  describe('should clone', () => {
    it('with same values', async () => {
      const clone = grid.clone();
      expect(clone.listCells()).toEqual([
        '0-0', '0-1', '0-2',
        '1-0', '1-1', '1-2',
        '2-0', '2-1', '2-2',
      ]);
    });

    it('with manipulated values', async () => {
      const clone = grid.clone((value) => `${value} (clone)`);
      expect(clone.listCells()).toEqual([
        '0-0 (clone)', '0-1 (clone)', '0-2 (clone)',
        '1-0 (clone)', '1-1 (clone)', '1-2 (clone)',
        '2-0 (clone)', '2-1 (clone)', '2-2 (clone)',
      ]);
    });
  });
});
