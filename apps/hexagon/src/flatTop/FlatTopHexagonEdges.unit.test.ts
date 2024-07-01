import {FlatTopHexagonEdges} from './FlatTopHexagonEdges'
import {FLAT_TOP_HEXAGON_NEIGHBOR_DIRECTIONS} from './FlatTopHexagonDirection'
import {FlatTopHexagonGrid} from './FlatTopHexagonGrid'
import {preInitializedGridOptionsFixture} from './FlatTopHexagonGrid.fixture'

describe(FlatTopHexagonEdges.name, () => {
  it.each(FLAT_TOP_HEXAGON_NEIGHBOR_DIRECTIONS)('should have consistent previous/next directions for %s', (direction) => {
    const grid = new FlatTopHexagonGrid(preInitializedGridOptionsFixture)
    const cell = grid.getCell({row: 1, col: 1})

    const edge = new FlatTopHexagonEdges(grid, cell).get(direction)
    const previousEdge = edge.getPreviousEdge()
    const nextEdge = edge.getNextEdge()

    expect(previousEdge.getNextEdge().id).toEqual(edge.id)
    expect(nextEdge.getPreviousEdge().id).toEqual(edge.id)
  })
})
