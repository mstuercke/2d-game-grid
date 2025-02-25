import {SquareGrid} from '../../../SquareGrid.js'
import {preInitializedGridOptionsFixture} from '../../../SquareGrid.fixture.js'
import type {SquareCell} from '../../../SquareCell.js'
import {mapWalkableMatrix} from './mapWalkableMatrix.js'

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
