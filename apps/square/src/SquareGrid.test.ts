import {SquareGrid} from './SquareGrid'
import {initializeGridOptionsFixture, preInitializedGridOptionsFixture} from './SquareGrid.fixture'
import type {SquareCell} from './SquareCell'

describe('SquareGrid', () => {
  let grid: SquareGrid<string>

  beforeEach(() => {
    grid = new SquareGrid<string>(preInitializedGridOptionsFixture)
  })

  describe('constructor', () => {
    it('should create grid', async () => {
      grid = new SquareGrid<string>(initializeGridOptionsFixture)
      expect(toValues(grid.grid)).toEqual([
        ['0-0', '0-1', '0-2', '0-3'],
        ['1-0', '1-1', '1-2', '1-3'],
        ['2-0', '2-1', '2-2', '2-3'],
      ])
    })

    it('should create grid with pre-initialized rows', async () => {
      grid = new SquareGrid<string>(preInitializedGridOptionsFixture)
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

function toValues<T>(grid: SquareCell<T>[][]): T[][] {
  return grid.map((row) => row.map((cell) => cell.value))
}
