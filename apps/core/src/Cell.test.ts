import {GridEventDispatcher} from './utils/index.js'
import {GenericTestCell, TestCell} from './Cell.fixture.js'
import {preInitializedGridOptionsFixture, TestGrid} from './Grid.fixture.js'

vi.mock('./utils/GridEventDispatcher')
const GridEventDispatcherMock = vi.mocked(GridEventDispatcher)

describe('Cell', () => {
  let cell: TestCell
  const eventDispatcherMock = {
    onCellValueChanged: vi.fn(),
    dispatchCellValueChangedEvent: vi.fn(),
  }

  beforeEach(() => {
    GridEventDispatcherMock.mockReturnValue(eventDispatcherMock as any)
    const grid = new TestGrid(preInitializedGridOptionsFixture)
    cell = new TestCell(grid, {row: 1, col: 2}, 'foo')
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
      const callback = vi.fn()
      cell.onValueChanged(callback)
      expect(eventDispatcherMock.onCellValueChanged).toHaveBeenCalledWith(callback)
    })

    it('should unregister callback', async () => {
      const unregisterFn = vi.fn()
      eventDispatcherMock.onCellValueChanged.mockReturnValueOnce(unregisterFn)

      const unregister = cell.onValueChanged(vi.fn())
      unregister()

      expect(unregisterFn).toHaveBeenCalled()
    })

    it('should dispatch event when value has changed', async () => {
      cell.value = 'updated'
      expect(eventDispatcherMock.dispatchCellValueChangedEvent).toHaveBeenCalledWith({cell})
    })

    it(`should dispatch event when values' inner properties changed`, async () => {
      const cell = new GenericTestCell({row: 1, col: 2}, {foo: 'bar'})
      cell.value.foo = 'bar (updated)'
      expect(eventDispatcherMock.dispatchCellValueChangedEvent).toHaveBeenCalledWith({cell})
    })
  })
})
