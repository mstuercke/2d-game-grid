import {Grid} from './Grid';
import {Neighbours} from './Neighbours';
import {Coordinate} from './Coordinate';
import {getDistance} from './algorithms/distance/getDistance';
import {preInitializedGridOptionsFixture} from './Grid.fixture';
import {Cell} from './Cell';
import {getPath} from './algorithms/pathfinding/getPath';
import {PathfindingOptions} from './algorithms';

jest.mock('./Neighbours');
const NeighboursMock = jest.mocked(Neighbours);

jest.mock('./algorithms/distance/getDistance');
const getDistanceMock = jest.mocked(getDistance);

jest.mock('./algorithms/pathfinding/getPath');
const getPathMock = jest.mocked(getPath);

describe('Cell', () => {
  let grid: Grid<string>;
  let cell: Cell<string>;

  beforeEach(() => {
    grid = new Grid<string>(preInitializedGridOptionsFixture);
    cell = new Cell<string>(grid, {row: 1, col: 2}, 'foo');
  });

  it('should have correct id', async () => {
    expect(cell.id).toEqual('cell|1-2');
  });

  it('should get cell value', async () => {
    expect(cell.value).toEqual('foo');
  });

  it('should set cell value', async () => {
    cell.value = 'bar';
    expect(cell.value).toEqual('bar');
  });

  it('should get row', async () => {
    expect(cell.getRow().row).toEqual(1);
  });

  it('should get column', async () => {
    expect(cell.getColumn().col).toEqual(2);
  });

  it('should initialize neighbours', async () => {
    const neighbours = {} as Neighbours<null>;
    NeighboursMock.mockReturnValueOnce(neighbours);

    expect(cell.neighbours).toBe(neighbours);
    expect(NeighboursMock).toHaveBeenCalledWith(grid, cell);
  });

  it.each`
    passedAlgorithm | usedAlgorithm 
    ${undefined}    | ${'MANHATTAN'}
    ${'MANHATTAN'}  | ${'MANHATTAN'} 
    ${'EUCLIDEAN'}  | ${'EUCLIDEAN'}
  `('should get $usedAlgorithm ($passedAlgorithm) distance', ({passedAlgorithm, usedAlgorithm}) => {
    getDistanceMock.mockReturnValueOnce(7);
    const target: Coordinate = {row: 2, col: 2};

    const distance = cell.getDistance(target, passedAlgorithm);

    expect(getDistanceMock).toHaveBeenCalledWith(cell, target, usedAlgorithm);
    expect(distance).toEqual(7);
  });

  it('should get path', () => {
    const options: PathfindingOptions<string> = {};
    const target: Coordinate = {row: 2, col: 2};
    cell.getPath(target, options);
    expect(getPathMock).toHaveBeenCalledWith(grid, cell, target, options);
  });

  describe('should clone', () => {
    it('with same value', async () => {
      const clone = cell.clone();
      expect(clone.value).toEqual('foo');
    });

    it('with manipulated value', async () => {
      const clone = cell.clone((value) => `${value} (clone)`);
      expect(clone.value).toEqual('foo (clone)');
    });
  });
});
