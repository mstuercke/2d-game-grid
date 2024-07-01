import {SquareCorners} from './SquareCorners'
import {DIAGONAL_DIRECTIONS} from '@2d-game-grid/core'
import {SquareGrid} from './SquareGrid'
import {preInitializedGridOptionsFixture} from './SquareGrid.fixture'

describe(SquareCorners.name, () => {
  it.each(DIAGONAL_DIRECTIONS)('should have 3 neighbors for corner %s', (cornerDirection) => {
    const grid = new SquareGrid(preInitializedGridOptionsFixture)
    const cell = grid.getCell({row: 1, col: 1})

    expect(cell.corners.get(cornerDirection).neighborCells).toHaveLength(3)
  })
})
