import {Column} from './Column.js'
import {preInitializedGridOptionsFixture, TestGrid} from './Grid.fixture.js'
import type {TestDirections} from './Directions.fixture.js'
import type {TestCell} from './Cell.fixture.js'

describe('Column', () => {
  let column: Column<string, TestDirections, TestCell>

  beforeEach(() => {
    const grid = new TestGrid(preInitializedGridOptionsFixture)
    column = new Column(grid, 2)
  })

  it('should have correct id', async () => {
    expect(column.id).toEqual('column|2')
  })

  it('should list cells', async () => {
    const cells = column.cells
    const cellValues = cells.map((cell) => cell.value)
    expect(cellValues).toEqual(['0-2', '1-2', '2-2'])
  })

  it('should get cell', async () => {
    const cell = column.getCell(1)
    expect(cell.value).toEqual('1-2')
  })

  describe('event: OnCellValueChanged', () => {
    it('should register callback', async () => {
      const onCellValueChangedSpy = vi.spyOn(column['eventDispatcher'], 'onCellValueChanged')
      const callback = vi.fn()
      column.onCellValueChanged(callback)
      expect(onCellValueChangedSpy).toHaveBeenCalledWith(callback)
    })

    it('should unregister callback', async () => {
      const onCellValueChangedSpy = vi.spyOn(column['eventDispatcher'], 'onCellValueChanged')
      const unregisterFn = vi.fn()
      onCellValueChangedSpy.mockReturnValueOnce(unregisterFn)

      const unregister = column.onCellValueChanged(vi.fn())
      unregister()

      expect(unregisterFn).toHaveBeenCalled()
    })

    it('should forward events of all cells', async () => {
      const dispatchCellValueChangedEventSpy = vi.spyOn(column['eventDispatcher'], 'dispatchCellValueChangedEvent')
      for (const cell of column.cells) {
        const previousValue = cell.value
        cell.value = `${previousValue} (changed)`
        expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledWith({cell})
      }
      expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledTimes(column.cells.length)
    })
  })
})
