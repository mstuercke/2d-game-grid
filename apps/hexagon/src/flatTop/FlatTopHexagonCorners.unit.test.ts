import {FlatTopHexagonCorners} from './FlatTopHexagonCorners'
import {DIAGONAL_DIRECTIONS} from '@2d-game-grid/core'
import {FlatTopHexagonGrid} from './FlatTopHexagonGrid'
import {preInitializedGridOptionsFixture} from './FlatTopHexagonGrid.fixture'

describe(FlatTopHexagonCorners.name, () => {
  it.each(DIAGONAL_DIRECTIONS)('should have 3 neighbors for corner %s', (cornerDirection) => {
    const grid = new FlatTopHexagonGrid(preInitializedGridOptionsFixture)
    const cell = grid.getCell({row: 1, col: 1})

    expect(cell.corners.get(cornerDirection).neighborCells).toHaveLength(2)
  })
})
