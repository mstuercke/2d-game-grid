import {SquareGrid} from './SquareGrid'
import {SquareNeighbors} from './SquareNeighbors'
import {preInitializedGridOptionsFixture} from './SquareGrid.fixture'
import type {SquareCell} from './SquareCell'

describe('SquareNeighbors', () => {
  let grid: SquareGrid<string>

  beforeEach(() => {
    grid = new SquareGrid<string>(preInitializedGridOptionsFixture)
  })

  it('should get all neighbors', async () => {
    const result = new SquareNeighbors(grid, {row: 1, col: 1}).list()
    expect(toValues(result)).toEqual(['0-1', '2-1', '1-0', '1-2', '0-0', '0-2', '2-0', '2-2'])
  })

  it('should get all neighbors coordinates ', async () => {
    const result = new SquareNeighbors(grid, {row: 1, col: 1}).listCoordinates()
    expect(result).toEqual([
      {row: 0, col: 1, direction: 'TOP', source: {row: 1, col: 1}},
      {row: 2, col: 1, direction: 'BOTTOM', source: {row: 1, col: 1}},
      {row: 1, col: 0, direction: 'LEFT', source: {row: 1, col: 1}},
      {row: 1, col: 2, direction: 'RIGHT', source: {row: 1, col: 1}},
      {row: 0, col: 0, direction: 'TOP_LEFT', source: {col: 1, row: 1}},
      {row: 0, col: 2, direction: 'TOP_RIGHT', source: {col: 1, row: 1}},
      {row: 2, col: 0, direction: 'BOTTOM_LEFT', source: {col: 1, row: 1}},
      {row: 2, col: 2, direction: 'BOTTOM_RIGHT', source: {col: 1, row: 1}},
    ])
  })
})

function toValues<T>(cells: SquareCell<T>[]): T[] {
  return cells.map((cell) => cell.value)
}
