import {initializeGridOptionsFixture, preInitializedGridOptionsFixture} from './FlatTopHexagonGrid.fixture'
import {FlatTopHexagonGrid} from './FlatTopHexagonGrid'
import type {FlatTopHexagonCell} from './FlatTopHexagonCell'

describe(FlatTopHexagonGrid.name, () => {
  let grid: FlatTopHexagonGrid<string>

  beforeEach(() => {
    jest.clearAllMocks()
    grid = new FlatTopHexagonGrid<string>(preInitializedGridOptionsFixture)
  })

  describe('constructor', () => {
    it('should create grid', async () => {
      grid = new FlatTopHexagonGrid<string>(initializeGridOptionsFixture)
      expect(toValues(grid.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ])
    })

    it('should create grid with pre-initialized rows', async () => {
      grid = new FlatTopHexagonGrid<string>(preInitializedGridOptionsFixture)
      expect(toValues(grid.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ])
    })
  })

  it('should clone', () => {
    expect(toValues(grid.clone().grid)).toEqual(toValues(grid.grid))
  })
})

function toValues<T>(grid: FlatTopHexagonCell<T>[][]): T[][] {
  return grid.map((row) => row.map((cell) => cell.value))
}
