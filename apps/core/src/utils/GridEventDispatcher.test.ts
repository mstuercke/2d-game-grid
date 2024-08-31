import {type CellValueChangedEvent, GridEventDispatcher} from './GridEventDispatcher'
import type {TestDirections} from '../Directions.fixture'

describe('GridEventDispatcher', () => {
  let eventDispatcher: GridEventDispatcher<string, TestDirections>

  beforeEach(() => {
    eventDispatcher = new GridEventDispatcher<string, TestDirections>()
  })

  it('should register callback', async () => {
    const callback = vi.fn()
    eventDispatcher.onCellValueChanged(callback)
    expect(eventDispatcher.cellValueChangedListeners).toContain(callback)
    expect(eventDispatcher.cellValueChangedListeners).toHaveLength(1)
  })

  it('should unregister callback', async () => {
    const callback = vi.fn()
    const unregister = eventDispatcher.onCellValueChanged(callback)
    unregister()
    expect(eventDispatcher.cellValueChangedListeners).not.toContain(callback)
    expect(eventDispatcher.cellValueChangedListeners).toHaveLength(0)
  })

  it('should dispatch event to all registered callbacks', async () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()
    eventDispatcher.onCellValueChanged(callback1)
    eventDispatcher.onCellValueChanged(callback2)
    const event = {} as CellValueChangedEvent<string, TestDirections>

    eventDispatcher.dispatchCellValueChangedEvent(event)

    expect(callback1).toHaveBeenCalledWith(event)
    expect(callback2).toHaveBeenCalledWith(event)
  })
})
