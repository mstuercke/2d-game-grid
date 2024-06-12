import {SquareGrid} from '../../../SquareGrid'
import {preInitializedGridOptionsFixture} from '../../../SquareGrid.fixture'
import type {SquareCell} from '../../../SquareCell'
import {mapWalkableMatrix} from './mapWalkableMatrix'

describe('mapWalkableMatrix', () => {
  it('should map correctly', async () => {
    const grid = new SquareGrid(preInitializedGridOptionsFixture)
    const isWalkable = (cell: SquareCell<string>) => cell.col === cell.row
    expect(mapWalkableMatrix(grid, isWalkable)).toEqual([
      [0, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 0, 1],
    ])
  })
})
