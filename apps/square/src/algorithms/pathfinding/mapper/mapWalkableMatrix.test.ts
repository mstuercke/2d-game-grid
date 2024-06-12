import {Grid} from '../../../Grid'
import {preInitializedGridOptionsFixture} from '../../../Grid.fixture'
import type {Cell} from '../../../Cell'
import {mapWalkableMatrix} from './mapWalkableMatrix'

describe('mapWalkableMatrix', () => {
  it('should map correctly', async () => {
    const grid = new Grid(preInitializedGridOptionsFixture)
    const isWalkable = (cell: Cell<string>) => cell.col === cell.row
    expect(mapWalkableMatrix(grid, isWalkable)).toEqual([
      [0, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 0, 1],
    ])
  })
})
