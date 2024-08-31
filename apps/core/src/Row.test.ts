import {Row} from './Row'
import {preInitializedGridOptionsFixture, TestGrid} from './Grid.fixture'
import type {TestCell} from './Cell.fixture'
import type {TestDirections} from './Directions.fixture'

describe('Row', () => {
  let row: Row<string, TestDirections, TestCell>

  beforeEach(() => {
    const grid = new TestGrid(preInitializedGridOptionsFixture)
    row = new Row(grid, 2)
  })

  it('should have correct id', async () => {
    expect(row.id).toEqual('row|2')
  })

  it('should list cells', async () => {
    const cells = row.cells
    const cellValues = cells.map((cell) => cell.value)
    expect(cellValues).toEqual(['2-0', '2-1', '2-2', '2-3'])
  })

  it('should get cell', async () => {
    const cell = row.getCell(1)
    expect(cell.value).toEqual('2-1')
  })

  describe('event: OnCellValueChanged', () => {
    it('should register callback', async () => {
      const onCellValueChangedSpy = vi.spyOn(row['eventDispatcher'], 'onCellValueChanged')
      const callback = vi.fn()
      row.onCellValueChanged(callback)
      expect(onCellValueChangedSpy).toHaveBeenCalledWith(callback)
    })

    it('should unregister callback', async () => {
      const onCellValueChangedSpy = vi.spyOn(row['eventDispatcher'], 'onCellValueChanged')
      const unregisterFn = vi.fn()
      onCellValueChangedSpy.mockReturnValueOnce(unregisterFn)

      const unregister = row.onCellValueChanged(vi.fn())
      unregister()

      expect(unregisterFn).toHaveBeenCalled()
    })

    it('should forward events of all cells', async () => {
      const dispatchCellValueChangedEventSpy = vi.spyOn(row['eventDispatcher'], 'dispatchCellValueChangedEvent')
      for (const cell of row.cells) {
        const previousValue = cell.value
        cell.value = `${previousValue} (changed)`
        expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledWith({cell})
      }
      expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledTimes(row.cells.length)
    })
  })
})
