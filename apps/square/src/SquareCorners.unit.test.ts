import {SquareCorners} from './SquareCorners.js'
import {DIAGONAL_DIRECTIONS} from '@2d-game-grid/core'
import {SquareGrid} from './SquareGrid.js'
import {preInitializedGridOptionsFixture} from './SquareGrid.fixture.js'

describe(SquareCorners.name, () => {
  it.each(DIAGONAL_DIRECTIONS)('should have 3 neighbors for corner %s', (cornerDirection) => {
    const grid = new SquareGrid(preInitializedGridOptionsFixture)
    const cell = grid.getCell({row: 1, col: 1})

    expect(cell.corners.get(cornerDirection).neighborCells).toHaveLength(3)
  })
})
