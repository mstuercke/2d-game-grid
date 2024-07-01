import {FlatTopHexagonCorners} from './FlatTopHexagonCorners'
import {FlatTopHexagonGrid} from './FlatTopHexagonGrid'
import {preInitializedGridOptionsFixture} from './FlatTopHexagonGrid.fixture'
import {FLAT_TOP_HEXAGON_CORNER_DIRECTIONS} from './FlatTopHexagonDirection'

describe(FlatTopHexagonCorners.name, () => {
  it.each(FLAT_TOP_HEXAGON_CORNER_DIRECTIONS)('should have 2 neighbors for corner %s', (cornerDirection) => {
    const grid = new FlatTopHexagonGrid(preInitializedGridOptionsFixture)
    const cell = grid.getCell({row: 1, col: 1})

    expect(cell.corners.get(cornerDirection).neighborCells).toHaveLength(2)
  })
})
