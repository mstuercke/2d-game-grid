import {FlatTopHexagonNeighbors} from './FlatTopHexagonNeighbors.js'
import {GridEventDispatcher} from '@2d-game-grid/core'
import {preInitializedGridOptionsFixture} from './FlatTopHexagonGrid.fixture.js'
import {FlatTopHexagonCell} from './FlatTopHexagonCell.js'
import {FlatTopHexagonGrid} from './FlatTopHexagonGrid.js'

vi.mock('./FlatTopHexagonNeighbors')
const NeighborsMock = vi.mocked(FlatTopHexagonNeighbors)

vi.mock('@2d-game-grid/core', async () => ({
  ...(await vi.importActual('@2d-game-grid/core')),
  GridEventDispatcher: vi.fn(),
}))
const GridEventDispatcherMock = vi.mocked(GridEventDispatcher)

describe(FlatTopHexagonCell.name, () => {
  let grid: FlatTopHexagonGrid<string>
  let cell: FlatTopHexagonCell<string>
  const eventDispatcherMock = {
    onCellValueChanged: vi.fn(),
    dispatchCellValueChangedEvent: vi.fn(),
  }

  beforeEach(() => {
    GridEventDispatcherMock.mockReturnValue(eventDispatcherMock as any)
    grid = new FlatTopHexagonGrid<string>(preInitializedGridOptionsFixture)
    cell = new FlatTopHexagonCell<string>(grid, {row: 1, col: 2}, 'foo')
  })

  it('should get row', async () => {
    expect(cell.getRow().row).toEqual(1)
  })

  it('should get column', async () => {
    expect(cell.getColumn().col).toEqual(2)
  })

  it('should initialize neighbors', async () => {
    const neighbors = {} as FlatTopHexagonNeighbors<unknown>
    NeighborsMock.mockReturnValueOnce(neighbors)

    const cell = new FlatTopHexagonCell<string>(grid, {row: 1, col: 2}, 'foo')

    expect(cell.neighbors).toBe(neighbors)
    expect(NeighborsMock).toHaveBeenCalledWith(grid, cell)
  })

  describe('should clone', () => {
    it('with same value', async () => {
      const clone = cell.clone()
      expect(clone.value).toEqual('foo')
    })

    it('with manipulated value', async () => {
      const clone = cell.clone((value) => `${value} (clone)`)
      expect(clone.value).toEqual('foo (clone)')
    })
  })
})
