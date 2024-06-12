import {SquareGrid} from '../../../SquareGrid'
import {preInitializedGridOptionsFixture} from '../../../SquareGrid.fixture'
import {mapCells} from './mapCells'

describe('mapCells', () => {
  it('should map path to cells', async () => {
    const grid = new SquareGrid(preInitializedGridOptionsFixture)
    const path = [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ]
    expect(mapCells(grid, path).map((cell) => cell.value)).toEqual(['0-0', '0-1', '1-1', '1-2'])
  })
})
