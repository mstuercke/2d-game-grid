import {initializeGridOptionsFixture, preInitializedGridOptionsFixture} from './FlatTopHexagonGrid.fixture'
import {GridEventDispatcher} from '@2d-game-grid/core'
import {FlatTopHexagonGrid} from './FlatTopHexagonGrid'
import type {FlatTopHexagonCell} from './FlatTopHexagonCell'

jest.mock('@2d-game-grid/core', () => ({
  ...jest.requireActual('@2d-game-grid/core'),
  GridEventDispatcher: jest.fn(),
}))
const GridEventDispatcherMock = jest.mocked(GridEventDispatcher)

describe(FlatTopHexagonGrid.name, () => {
  let grid: FlatTopHexagonGrid<string>
  const eventDispatcherMock = {
    onCellValueChanged: jest.fn(),
    dispatchCellValueChangedEvent: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    GridEventDispatcherMock.mockReturnValue(eventDispatcherMock as any)
    grid = new FlatTopHexagonGrid<string>(preInitializedGridOptionsFixture)
  })

  describe('constructor', () => {
    it('should create grid', async () => {
      grid = new FlatTopHexagonGrid<string>(initializeGridOptionsFixture)
      expect(toValues(grid.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ])
    })

    it('should create grid with pre-initialized rows', async () => {
      grid = new FlatTopHexagonGrid<string>(preInitializedGridOptionsFixture)
      expect(toValues(grid.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ])
    })
  })

  describe('extend', () => {
    const gridA = new FlatTopHexagonGrid<string>({
      width: 2,
      height: 3,
      initializeCellValue: ({row, col}) => `A-${row}-${col}`,
    })
    const gridB = new FlatTopHexagonGrid<string>({
      width: 2,
      height: 3,
      initializeCellValue: ({row, col}) => `B-${row}-${col}`,
    })
    const gridC = new FlatTopHexagonGrid<string>({
      width: 3,
      height: 4,
      initializeCellValue: ({row, col}) => `C-${row}-${col}`,
    })

    it.each`
      direction   | expectedValues
      ${'TOP'}    | ${[['B-0-0', 'B-0-1'], ['B-1-0', 'B-1-1'], ['B-2-0', 'B-2-1'], ['A-0-0', 'A-0-1'], ['A-1-0', 'A-1-1'], ['A-2-0', 'A-2-1']]}
      ${'BOTTOM'} | ${[['A-0-0', 'A-0-1'], ['A-1-0', 'A-1-1'], ['A-2-0', 'A-2-1'], ['B-0-0', 'B-0-1'], ['B-1-0', 'B-1-1'], ['B-2-0', 'B-2-1']]}
      ${'LEFT'}   | ${[['B-0-0', 'B-0-1', 'A-0-0', 'A-0-1'], ['B-1-0', 'B-1-1', 'A-1-0', 'A-1-1'], ['B-2-0', 'B-2-1', 'A-2-0', 'A-2-1']]}
      ${'RIGHT'}  | ${[['A-0-0', 'A-0-1', 'B-0-0', 'B-0-1'], ['A-1-0', 'A-1-1', 'B-1-0', 'B-1-1'], ['A-2-0', 'A-2-1', 'B-2-0', 'B-2-1']]}
    `('should extend to $direction', async ({direction, expectedValues}) => {
      const extendedGrid = gridA.extend(gridB, direction)
      expect(toValues(extendedGrid.grid)).toEqual(expectedValues)
    })

    it.each(['LEFT', 'RIGHT'])('should throw error if width of both grids does not match (direction: %s)', async (direction) => {
      expect(() => gridA.extend(gridC, direction as any)).toThrowError()
    })

    it.each(['TOP', 'BOTTOM'])('should throw error if height of both grids does not match (direction: %s)', async (direction) => {
      expect(() => gridA.extend(gridC, direction as any)).toThrowError()
    })
  })

  describe('crop', () => {
    it('should crop', async () => {
      const grid = new FlatTopHexagonGrid<string>({
        width: 10,
        height: 10,
        initializeCellValue: ({row, col}) => `${row}-${col}`,
      })

      const newGrid = grid.crop({row: 1, col: 2}, {row: 3, col: 4})

      expect(toValues(newGrid.grid)).toEqual([
        ['1-2', '1-3', '1-4'],
        ['2-2', '2-3', '2-4'],
        ['3-2', '3-3', '3-4'],
      ])
    })

    it('should throw error when coordinates mismatch', async () => {
      expect(() => grid.crop({row: 3, col: 4}, {row: 1, col: 2})).toThrowError()
    })
  })

  describe('should clone', () => {
    it('with same values', async () => {
      const clone = grid.clone()
      expect(toValues(clone.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ])
    })

    it('with manipulated values', async () => {
      const clone = grid.clone((value) => `${value} (clone)`)
      expect(toValues(clone.grid)).toEqual([
        ['0-0 (clone)', '0-1 (clone)', '0-2 (clone)', '0-3 (clone)'],
        ['1-0 (clone)', '1-1 (clone)', '1-2 (clone)', '1-3 (clone)'],
        ['2-0 (clone)', '2-1 (clone)', '2-2 (clone)', '2-3 (clone)'],
      ])
    })
  })
})

function toValues<T>(grid: FlatTopHexagonCell<T>[][]): T[][] {
  return grid.map((row) => row.map((cell) => cell.value))
}
