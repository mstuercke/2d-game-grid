import {SquareGrid} from './SquareGrid'
import {SquareNeighbors} from './SquareNeighbors'
import type {Coordinate} from '@2d-game-grid/core'
import {GridEventDispatcher} from '@2d-game-grid/core'
import {getDistance} from './algorithms/distance/getDistance'
import {preInitializedGridOptionsFixture} from './SquareGrid.fixture'
import {SquareCell} from './SquareCell'
import {getPath} from './algorithms/pathfinding/getPath'
import type {PathfindingOptions} from './algorithms'
import {listCellsInDistance} from './algorithms/distance/listCellsInDistance'
import {listReachableCells} from './algorithms/pathfinding/listReachableCells'

jest.mock('./SquareNeighbors')
const NeighborsMock = jest.mocked(SquareNeighbors)

jest.mock('./algorithms/distance/getDistance')
const getDistanceMock = jest.mocked(getDistance)

jest.mock('./algorithms/distance/listCellsInDistance')
const listCellsInDistanceMock = jest.mocked(listCellsInDistance)

jest.mock('./algorithms/pathfinding/getPath')
const getPathMock = jest.mocked(getPath)

jest.mock('./algorithms/pathfinding/listReachableCells')
const listReachableCellsMock = jest.mocked(listReachableCells)

jest.mock('@2d-game-grid/core', () => ({
  ...jest.requireActual('@2d-game-grid/core'),
  GridEventDispatcher: jest.fn(),
}))
const GridEventDispatcherMock = jest.mocked(GridEventDispatcher)

describe('SquareCell', () => {
  let grid: SquareGrid<string>
  let cell: SquareCell<string>
  const eventDispatcherMock = {
    onCellValueChanged: jest.fn(),
    dispatchCellValueChangedEvent: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    GridEventDispatcherMock.mockReturnValue(eventDispatcherMock as any)
    grid = new SquareGrid<string>(preInitializedGridOptionsFixture)
    cell = new SquareCell<string>(grid, {row: 1, col: 2}, 'foo')
  })

  it('should get row', async () => {
    expect(cell.getRow().row).toEqual(1)
  })

  it('should get column', async () => {
    expect(cell.getColumn().col).toEqual(2)
  })

  it('should initialize neighbors', async () => {
    const neighbors = {} as SquareNeighbors<unknown>
    NeighborsMock.mockReturnValueOnce(neighbors)

    const cell = new SquareCell<string>(grid, {row: 1, col: 2}, 'foo')

    expect(cell.neighbors).toBe(neighbors)
    expect(NeighborsMock).toHaveBeenCalledWith(grid, cell)
  })

  it.each`
    passedAlgorithm | usedAlgorithm
    ${undefined}    | ${'MANHATTAN'}
    ${'MANHATTAN'}  | ${'MANHATTAN'}
    ${'EUCLIDEAN'}  | ${'EUCLIDEAN'}
  `('should get $usedAlgorithm ($passedAlgorithm) distance', ({passedAlgorithm, usedAlgorithm}) => {
    getDistanceMock.mockReturnValueOnce(7)
    const target: Coordinate = {row: 2, col: 2}

    const distance = cell.getDistance(target, passedAlgorithm)

    expect(getDistanceMock).toHaveBeenCalledWith(cell, target, usedAlgorithm)
    expect(distance).toEqual(7)
  })

  it.each`
    passedAlgorithm | usedAlgorithm
    ${undefined}    | ${'MANHATTAN'}
    ${'MANHATTAN'}  | ${'MANHATTAN'}
    ${'EUCLIDEAN'}  | ${'EUCLIDEAN'}
  `('should list cells in distance with $usedAlgorithm ($passedAlgorithm) distance', ({passedAlgorithm, usedAlgorithm}) => {
    const cellsInDistance: SquareCell<string>[] = []
    listCellsInDistanceMock.mockReturnValueOnce([])

    const result = cell.listCellsInDistance(2, passedAlgorithm)

    expect(listCellsInDistanceMock).toHaveBeenCalledWith(cell, 2, usedAlgorithm)
    expect(result).toEqual(cellsInDistance)
  })

  it('should get path', () => {
    const options: PathfindingOptions<string> = {}
    const target: Coordinate = {row: 2, col: 2}
    cell.getPath(target, options)
    expect(getPathMock).toHaveBeenCalledWith(grid, cell, target, options)
  })

  it('should list reachable cells', () => {
    const options: PathfindingOptions<string> = {}
    cell.listReachableCells(2, options)
    expect(listReachableCellsMock).toHaveBeenCalledWith(cell, 2, options)
  })

  describe('should clone', () => {
    it('with same value', async () => {
      const clone = cell.clone()
      expect(clone.value).toEqual('foo')
    })

    it('with manipulated value', async () => {
      const clone = cell.clone((value) => `${value} (clone)`)
      expect(clone.value).toEqual('foo (clone)')
    })
  })
})
