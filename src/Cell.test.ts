import {Grid} from './Grid';
import {Neighbours} from './Neighbours';
import {Coordinate} from './Coordinate';
import {getDistance} from './algorithms/distance/getDistance';
import {preInitializedGridOptionsFixture} from './Grid.fixture';
import {Cell} from './Cell';

jest.mock('./Neighbours');
const NeighboursMock = jest.mocked(Neighbours);

jest.mock('./algorithms/distance/getDistance');
const getDistanceMock = jest.mocked(getDistance);

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
    expect(cell.row.row).toEqual(1);
  });

  it('should get column', async () => {
    expect(cell.column.col).toEqual(2);
  });

  it('should initialize neighbours', async () => {
    const neighbours = {} as Neighbours<null>;
    NeighboursMock.mockReturnValueOnce(neighbours);

    expect(cell.neighbours).toBe(neighbours);
    expect(NeighboursMock).toHaveBeenCalledWith(grid, cell.coordinate);
  });

  describe.each`
    passedAlgorithm | usedAlgorithm 
    ${undefined}    | ${'MANHATTAN'}
    ${'MANHATTAN'}  | ${'MANHATTAN'} 
    ${'EUCLIDEAN'}  | ${'EUCLIDEAN'}
  `('should get $usedAlgorithm ($passedAlgorithm) distance', ({passedAlgorithm, usedAlgorithm}) => {
    it('with coordinate', async () => {
      getDistanceMock.mockReturnValueOnce(7);
      const target: Coordinate = {row: 2, col: 2};

      const distance = cell.getDistance(target, passedAlgorithm);

      expect(getDistanceMock).toHaveBeenCalledWith(cell.coordinate, target, usedAlgorithm);
      expect(distance).toEqual(7);
    });

    it('with cell', async () => {
      getDistanceMock.mockReturnValueOnce(7);
      const target: Cell<string> = new Cell<string>(grid, {row: 2, col: 2}, 'foo');

      const distance = cell.getDistance(target, passedAlgorithm);

      expect(getDistanceMock).toHaveBeenCalledWith(cell.coordinate, target.coordinate, usedAlgorithm);
      expect(distance).toEqual(7);
    });
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
