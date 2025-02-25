import {SquareEdges} from './SquareEdges.js'
import {SquareGrid} from './SquareGrid.js'
import {preInitializedGridOptionsFixture} from './SquareGrid.fixture.js'
import {STRAIGHT_DIRECTIONS} from '@2d-game-grid/core'

describe(SquareEdges.name, () => {
  it.each(STRAIGHT_DIRECTIONS)('should have consistent previous/next directions for %s', (direction) => {
    const grid = new SquareGrid(preInitializedGridOptionsFixture)
    const cell = grid.getCell({row: 1, col: 1})

    const edge = new SquareEdges(grid, cell).get(direction)
    const previousEdge = edge.getPreviousEdge()
    const nextEdge = edge.getNextEdge()

    expect(previousEdge.getNextEdge().id).toEqual(edge.id)
    expect(nextEdge.getPreviousEdge().id).toEqual(edge.id)
  })
})
