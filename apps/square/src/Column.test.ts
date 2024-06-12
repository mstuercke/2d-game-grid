import {Column} from './Column'
import {Grid} from './Grid'
import {preInitializedGridOptionsFixture} from './Grid.fixture'

describe('Column', () => {
  let column: Column<string>

  beforeEach(() => {
    jest.clearAllMocks()
    const grid = new Grid<string>(preInitializedGridOptionsFixture)
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
      const onCellValueChangedSpy = jest.spyOn(column['eventDispatcher'], 'onCellValueChanged')
      const callback = jest.fn()
      column.onCellValueChanged(callback)
      expect(onCellValueChangedSpy).toHaveBeenCalledWith(callback)
    })

    it('should unregister callback', async () => {
      const onCellValueChangedSpy = jest.spyOn(column['eventDispatcher'], 'onCellValueChanged')
      const unregisterFn = jest.fn()
      onCellValueChangedSpy.mockReturnValueOnce(unregisterFn)

      const unregister = column.onCellValueChanged(jest.fn())
      unregister()

      expect(unregisterFn).toHaveBeenCalled()
    })

    it('should forward events of all cells', async () => {
      const dispatchCellValueChangedEventSpy = jest.spyOn(column['eventDispatcher'], 'dispatchCellValueChangedEvent')
      for (const cell of column.cells) {
        const previousValue = cell.value
        cell.value = `${previousValue} (changed)`
        expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledWith({cell, previousValue})
      }
      expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledTimes(column.cells.length)
    })
  })
})
