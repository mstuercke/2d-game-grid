import type {Cell} from '@2d-game-grid/core'
import {FlatTopHexagonGrid} from './FlatTopHexagonGrid'
import {FlatTopHexagonNeighbors} from './FlatTopHexagonNeighbors'
import {preInitializedGridOptionsFixture} from './FlatTopHexagonGrid.fixture'

describe(FlatTopHexagonNeighbors.name, () => {
  let grid: FlatTopHexagonGrid<string>

  beforeEach(() => {
    grid = new FlatTopHexagonGrid<string>(preInitializedGridOptionsFixture)
  })

  it('should get all neighbors (even)', async () => {
    const result = new FlatTopHexagonNeighbors(grid, {row: 1, col: 2}).list()
    expect(toValues(result)).toEqual(['0-1', '0-2', '0-3', '1-3', '2-2', '1-1'])
  })

  it('should get all neighbors (odd)', async () => {
    const result = new FlatTopHexagonNeighbors(grid, {row: 1, col: 1}).list()
    expect(toValues(result)).toEqual(['1-0', '0-1', '1-2', '2-2', '2-1', '2-0'])
  })

  it('should get all neighbors coordinates (even)', async () => {
    const result = new FlatTopHexagonNeighbors(grid, {row: 1, col: 2}).listCoordinates()
    expect(result).toEqual([
      {row: 0, col: 1, direction: 'TOP_LEFT', source: {row: 1, col: 2}},
      {row: 0, col: 2, direction: 'TOP', source: {row: 1, col: 2}},
      {row: 0, col: 3, direction: 'TOP_RIGHT', source: {row: 1, col: 2}},
      {row: 1, col: 3, direction: 'BOTTOM_RIGHT', source: {row: 1, col: 2}},
      {row: 2, col: 2, direction: 'BOTTOM', source: {row: 1, col: 2}},
      {row: 1, col: 1, direction: 'BOTTOM_LEFT', source: {row: 1, col: 2}},
    ])
  })

  it('should get all neighbors coordinates (odd)', async () => {
    const result = new FlatTopHexagonNeighbors(grid, {row: 1, col: 1}).listCoordinates()
    expect(result).toEqual([
      {row: 1, col: 0, direction: 'TOP_LEFT', source: {row: 1, col: 1}},
      {row: 0, col: 1, direction: 'TOP', source: {row: 1, col: 1}},
      {row: 1, col: 2, direction: 'TOP_RIGHT', source: {row: 1, col: 1}},
      {row: 2, col: 2, direction: 'BOTTOM_RIGHT', source: {row: 1, col: 1}},
      {row: 2, col: 1, direction: 'BOTTOM', source: {row: 1, col: 1}},
      {row: 2, col: 0, direction: 'BOTTOM_LEFT', source: {row: 1, col: 1}},
    ])
  })
})

function toValues<T>(cells: Cell<T, any, any>[]): T[] {
  return cells.map((cell) => cell.value)
}
