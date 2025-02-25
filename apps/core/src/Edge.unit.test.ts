import {Edge} from './Edge.js'
import {TestEdges} from './Edges.fixture.js'
import {TestGrid} from './Grid.fixture.js'

describe(Edge.name, () => {
  it('should create the same id for source and adjacent cell', () => {
    const grid = new TestGrid()

    const cell1 = grid.getCell({row: 1, col: 1})
    const edge1 = new TestEdges(grid, cell1).get('LEFT')
    expect(edge1.id).toEqual('edge[1-0|1-1]')

    const cell2 = grid.getCell({row: 1, col: 0})
    const edge2 = new TestEdges(grid, cell2).get('RIGHT')
    expect(edge2.id).toEqual('edge[1-0|1-1]')
  })

  it('should generate id, even if no neighbor is present', async () => {
    const grid = new TestGrid()

    const cell1 = grid.getCell({row: 1, col: 0})
    const edge1 = new TestEdges(grid, cell1).get('LEFT')
    expect(edge1.id).toEqual('edge[1-0|LEFT]')
  })

  it.each`
    direction   | cellId
    ${'LEFT'}   | ${'edge[1-1|2-1]'}
    ${'TOP'}    | ${'edge[1-0|1-1]'}
    ${'RIGHT'}  | ${'edge[0-1|1-1]'}
    ${'BOTTOM'} | ${'edge[1-1|1-2]'}
  `('should get previous edge for $direction', async ({direction, cellId}) => {
    const grid = new TestGrid()
    const cell = grid.getCell({row: 1, col: 1})
    const edge = new TestEdges(grid, cell).get(direction)

    const previousEdge = edge.getPreviousEdge()

    expect(previousEdge.id).toEqual(cellId)
  })

  it.each`
    direction   | cellId
    ${'LEFT'}   | ${'edge[0-1|1-1]'}
    ${'TOP'}    | ${'edge[1-1|1-2]'}
    ${'RIGHT'}  | ${'edge[1-1|2-1]'}
    ${'BOTTOM'} | ${'edge[1-0|1-1]'}
  `('should get next edge for $direction', async ({direction, cellId}) => {
    const grid = new TestGrid()
    const cell = grid.getCell({row: 1, col: 1})
    const edge = new TestEdges(grid, cell).get(direction)

    const previousEdge = edge.getNextEdge()

    expect(previousEdge.id).toEqual(cellId)
  })
})
