import type {Grid} from './Grid.js'
import {initializeGridOptionsFixture, preInitializedGridOptionsFixture, TestGrid} from './Grid.fixture.js'
import {GridEventDispatcher} from './utils/index.js'
import type {TestDirections} from './Directions.fixture.js'
import type {TestCell} from './Cell.fixture.js'

vi.mock('./utils/GridEventDispatcher')
const GridEventDispatcherMock = vi.mocked(GridEventDispatcher)

describe('Grid', () => {
  let grid: Grid<string, TestDirections, TestCell>
  const eventDispatcherMock = {
    onCellValueChanged: vi.fn(),
    dispatchCellValueChangedEvent: vi.fn(),
  }

  beforeEach(() => {
    GridEventDispatcherMock.mockReturnValue(eventDispatcherMock as any)
    grid = new TestGrid(preInitializedGridOptionsFixture)
  })

  describe('constructor', () => {
    it('should create grid', async () => {
      grid = new TestGrid(initializeGridOptionsFixture)
      expect(toValues(grid.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ])
    })

    it('should create grid with pre-initialized rows', async () => {
      grid = new TestGrid(preInitializedGridOptionsFixture)
      expect(toValues(grid.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ])
    })

    it('should fail initialization on invalid options', async () => {
      expect(() => new TestGrid({} as any)).toThrow()
    })

    it('should throw error, when width is 0', async () => {
      expect(() => new TestGrid({width: 0, height: 1, initializeCellValue: () => ''})).toThrowError()
      expect(() => new TestGrid({grid: [[]]})).toThrowError()
    })

    it('should throw error, when height is 0', async () => {
      expect(() => new TestGrid({width: 1, height: 0, initializeCellValue: () => ''})).toThrowError()
      expect(() => new TestGrid({grid: []})).toThrowError()
    })
  })

  it('should get all cells', async () => {
    expect(grid.cells.map((cell) => cell.value)).toEqual(['0-0', '0-1', '0-2', '0-3', '1-0', '1-1', '1-2', '1-3', '2-0', '2-1', '2-2', '2-3'])
  })

  it('should get row', async () => {
    expect(grid.getRow(1).row).toEqual(1)
  })

  it('should list rows', async () => {
    const rows = grid.rows
    expect(rows.map((row) => row.row)).toEqual([0, 1, 2])
  })

  it('should get column', async () => {
    expect(grid.getColumn(1).col).toEqual(1)
  })

  it('should list columns', async () => {
    const columns = grid.columns
    expect(columns.map((col) => col.col)).toEqual([0, 1, 2, 3])
  })

  it('should get cell', async () => {
    const cell = grid.getCell({row: 1, col: 2})
    expect(cell.value).toEqual('1-2')
  })

  it.each`
    coordinate
    ${{row: -1, col: 0}}
    ${{row: 0, col: -1}}
    ${{row: 3, col: 0}}
    ${{row: 0, col: 4}}
    ${{row: -1, col: -1}}
    ${{row: 3, col: 3}}
  `('should not get cell that is out of bounds ($coordinate)', async ({coordinate}) => {
    expect(() => grid.getCell(coordinate)).toThrowError()
  })

  describe('event: OnCellValueChanged', () => {
    it('should register callback', async () => {
      const onCellValueChangedSpy = vi.spyOn(grid['eventDispatcher'], 'onCellValueChanged')
      const callback = vi.fn()
      grid.onCellValueChanged(callback)
      expect(onCellValueChangedSpy).toHaveBeenCalledWith(callback)
    })

    it('should unregister callback', async () => {
      const onCellValueChangedSpy = vi.spyOn(grid['eventDispatcher'], 'onCellValueChanged')
      const unregisterFn = vi.fn()
      onCellValueChangedSpy.mockReturnValueOnce(unregisterFn)

      const unregister = grid.onCellValueChanged(vi.fn())
      unregister()

      expect(unregisterFn).toHaveBeenCalled()
    })

    it('should forward events of all cells', async () => {
      const dispatchCellValueChangedEventSpy = vi.spyOn(grid['eventDispatcher'], 'dispatchCellValueChangedEvent')
      for (const cell of grid.cells) {
        const previousValue = cell.value
        cell.value = `${previousValue} (changed)`
        expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledWith({cell})
      }
      expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledTimes(grid.cells.length)
    })
  })

  describe('extend', () => {
    const gridA = new TestGrid({
      width: 2,
      height: 3,
      initializeCellValue: ({row, col}) => `A-${row}-${col}`,
    })
    const gridB = new TestGrid({
      width: 2,
      height: 3,
      initializeCellValue: ({row, col}) => `B-${row}-${col}`,
    })
    const gridC = new TestGrid({
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
      const grid = new TestGrid({
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

function toValues(grid: TestCell[][]): string[][] {
  return grid.map((row) => row.map((cell) => cell.value))
}
