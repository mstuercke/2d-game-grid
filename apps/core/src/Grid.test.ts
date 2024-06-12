import {Grid} from './Grid'
import {initializeGridOptionsFixture, preInitializedGridOptionsFixture, TestGrid} from './Grid.fixture'
import type {Cell} from './Cell'
import {GridEventDispatcher} from './utils'

jest.mock('./utils/GridEventDispatcher')
const GridEventDispatcherMock = jest.mocked(GridEventDispatcher)

describe('Grid', () => {
  let grid: Grid<string, Cell<string>>
  const eventDispatcherMock = {
    onCellValueChanged: jest.fn(),
    dispatchCellValueChangedEvent: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
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
      expect(() => new Grid<string, Cell<string>>({} as any, jest.fn())).toThrow()
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
      const onCellValueChangedSpy = jest.spyOn(grid['eventDispatcher'], 'onCellValueChanged')
      const callback = jest.fn()
      grid.onCellValueChanged(callback)
      expect(onCellValueChangedSpy).toHaveBeenCalledWith(callback)
    })

    it('should unregister callback', async () => {
      const onCellValueChangedSpy = jest.spyOn(grid['eventDispatcher'], 'onCellValueChanged')
      const unregisterFn = jest.fn()
      onCellValueChangedSpy.mockReturnValueOnce(unregisterFn)

      const unregister = grid.onCellValueChanged(jest.fn())
      unregister()

      expect(unregisterFn).toHaveBeenCalled()
    })

    it('should forward events of all cells', async () => {
      const dispatchCellValueChangedEventSpy = jest.spyOn(grid['eventDispatcher'], 'dispatchCellValueChangedEvent')
      for (const cell of grid.cells) {
        const previousValue = cell.value
        cell.value = `${previousValue} (changed)`
        expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledWith({cell, previousValue})
      }
      expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledTimes(grid.cells.length)
    })
  })
})

function toValues<T>(grid: Cell<T>[][]): T[][] {
  return grid.map((row) => row.map((cell) => cell.value))
}
