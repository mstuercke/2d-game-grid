import {Cell} from './Cell'
import {GridEventDispatcher} from './utils'

jest.mock('./utils/GridEventDispatcher')
const GridEventDispatcherMock = jest.mocked(GridEventDispatcher)

describe('Cell', () => {
  let cell: Cell<string>
  const eventDispatcherMock = {
    onCellValueChanged: jest.fn(),
    dispatchCellValueChangedEvent: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    GridEventDispatcherMock.mockReturnValue(eventDispatcherMock as any)
    cell = new Cell<string>({row: 1, col: 2}, 'foo')
  })

  it('should have correct id', async () => {
    expect(cell.id).toEqual('cell|1-2')
  })

  it('should get cell value', async () => {
    expect(cell.value).toEqual('foo')
  })

  it('should set cell value', async () => {
    cell.value = 'bar'
    expect(cell.value).toEqual('bar')
  })

  describe('event: OnCellValueChanged', () => {
    it('should register callback', async () => {
      const callback = jest.fn()
      cell.onValueChanged(callback)
      expect(eventDispatcherMock.onCellValueChanged).toHaveBeenCalledWith(callback)
    })

    it('should unregister callback', async () => {
      const unregisterFn = jest.fn()
      eventDispatcherMock.onCellValueChanged.mockReturnValueOnce(unregisterFn)

      const unregister = cell.onValueChanged(jest.fn())
      unregister()

      expect(unregisterFn).toHaveBeenCalled()
    })

    it('should dispatch event when value has changed', async () => {
      cell.value = 'updated'
      expect(eventDispatcherMock.dispatchCellValueChangedEvent).toHaveBeenCalledWith({
        cell: cell,
        previousValue: 'foo',
      })
    })
  })
})
