import {type CellValueChangedEvent, GridEventDispatcher} from './GridEventDispatcher'
import type {TestCornerDirection, TestEdgeDirection, TestNeighborDirection} from '../Direction.fixture'

describe('GridEventDispatcher', () => {
  let eventDispatcher: GridEventDispatcher<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>

  beforeEach(() => {
    jest.clearAllMocks()
    eventDispatcher = new GridEventDispatcher<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>()
  })

  it('should register callback', async () => {
    const callback = jest.fn()
    eventDispatcher.onCellValueChanged(callback)
    expect(eventDispatcher.cellValueChangedListeners).toContain(callback)
    expect(eventDispatcher.cellValueChangedListeners).toHaveLength(1)
  })

  it('should unregister callback', async () => {
    const callback = jest.fn()
    const unregister = eventDispatcher.onCellValueChanged(callback)
    unregister()
    expect(eventDispatcher.cellValueChangedListeners).not.toContain(callback)
    expect(eventDispatcher.cellValueChangedListeners).toHaveLength(0)
  })

  it('should dispatch event to all registered callbacks', async () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    eventDispatcher.onCellValueChanged(callback1)
    eventDispatcher.onCellValueChanged(callback2)
    const event = {} as CellValueChangedEvent<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>

    eventDispatcher.dispatchCellValueChangedEvent(event)

    expect(callback1).toHaveBeenCalledWith(event)
    expect(callback2).toHaveBeenCalledWith(event)
  })
})
