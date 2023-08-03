import {Grid} from './Grid';
import {Neighbors} from './Neighbors';
import {Coordinate} from './Coordinate';
import {getDistance} from './algorithms/distance/getDistance';
import {preInitializedGridOptionsFixture} from './Grid.fixture';
import {Cell} from './Cell';
import {getPath} from './algorithms/pathfinding/getPath';
import {PathfindingOptions} from './algorithms';
import {listCellsInDistance} from './algorithms/distance/listCellsInDistance';
import {listReachableCells} from './algorithms/pathfinding/listReachableCells';
import {GridEventDispatcher} from './utils/GridEventDispatcher';

jest.mock('./Neighbors');
const NeighborsMock = jest.mocked(Neighbors);

jest.mock('./algorithms/distance/getDistance');
const getDistanceMock = jest.mocked(getDistance);

jest.mock('./algorithms/distance/listCellsInDistance');
const listCellsInDistanceMock = jest.mocked(listCellsInDistance);

jest.mock('./algorithms/pathfinding/getPath');
const getPathMock = jest.mocked(getPath);

jest.mock('./algorithms/pathfinding/listReachableCells');
const listReachableCellsMock = jest.mocked(listReachableCells);

jest.mock('./utils/GridEventDispatcher');
const GridEventDispatcherMock = jest.mocked(GridEventDispatcher);

describe('Cell', () => {
  let grid: Grid<string>;
  let cell: Cell<string>;
  const eventDispatcherMock = {
    onCellValueChanged: jest.fn(),
    dispatchCellValueChangedEvent: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    GridEventDispatcherMock.mockReturnValue(eventDispatcherMock as any);
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

  it('should initialize neighbors', async () => {
    const neighbors = {} as Neighbors<null>;
    NeighborsMock.mockReturnValueOnce(neighbors);

    const cell = new Cell<string>(grid, {row: 1, col: 2}, 'foo');

    expect(cell.neighbors).toBe(neighbors);
    expect(NeighborsMock).toHaveBeenCalledWith(grid, cell);
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

  it.each`
    passedAlgorithm | usedAlgorithm 
    ${undefined}    | ${'MANHATTAN'}
    ${'MANHATTAN'}  | ${'MANHATTAN'} 
    ${'EUCLIDEAN'}  | ${'EUCLIDEAN'}
  `('should list cells in distance with $usedAlgorithm ($passedAlgorithm) distance',
      ({passedAlgorithm, usedAlgorithm}) => {
        const cellsInDistance: Cell<string>[] = [];
        listCellsInDistanceMock.mockReturnValueOnce([]);

        const result = cell.listCellsInDistance(2, passedAlgorithm);

        expect(listCellsInDistanceMock).toHaveBeenCalledWith(cell, 2, usedAlgorithm);
        expect(result).toEqual(cellsInDistance);
      });

  it('should get path', () => {
    const options: PathfindingOptions<string> = {};
    const target: Coordinate = {row: 2, col: 2};
    cell.getPath(target, options);
    expect(getPathMock).toHaveBeenCalledWith(grid, cell, target, options);
  });

  it('should list reachable cells', () => {
    const options: PathfindingOptions<string> = {};
    cell.listReachableCells(2, options);
    expect(listReachableCellsMock).toHaveBeenCalledWith(cell, 2, options);
  });

  describe('event: OnCellValueChanged', function () {
    it('should register callback', async () => {
      const callback = jest.fn();
      cell.onValueChanged(callback);
      expect(eventDispatcherMock.onCellValueChanged).toHaveBeenCalledWith(callback);
    });

    it('should unregister callback', async () => {
      const unregisterFn = jest.fn();
      eventDispatcherMock.onCellValueChanged.mockReturnValueOnce(unregisterFn);

      const unregister = cell.onValueChanged(jest.fn());
      unregister();

      expect(unregisterFn).toHaveBeenCalled();
    });

    it('should dispatch event when value has changed', async () => {
      cell.value = 'updated';
      expect(eventDispatcherMock.dispatchCellValueChangedEvent).toHaveBeenCalledWith({
        cell: cell,
        previousValue: 'foo',
      });
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
