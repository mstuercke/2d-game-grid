import {Edge} from './Edge'
import {TestEdges} from './Edges.fixture'
import {TestGrid} from './Grid.fixture'

describe(Edge.name, () => {
  it('should create the same id for source and adjacent cell', () => {
    const grid = new TestGrid()

    const cell1 = grid.getCell({row: 1, col: 1})
    const edge1 = new TestEdges(grid, cell1).get('LEFT')
    expect(edge1.id).toEqual('edge[cell|1-0:cell|1-1]')

    const cell2 = grid.getCell({row: 1, col: 0})
    const edge2 = new TestEdges(grid, cell2).get('RIGHT')
    expect(edge2.id).toEqual('edge[cell|1-0:cell|1-1]')
  })

  it('should generate id, even if no neighbor is present', async () => {
    const grid = new TestGrid()

    const cell1 = grid.getCell({row: 1, col: 0})
    const edge1 = new TestEdges(grid, cell1).get('LEFT')
    expect(edge1.id).toEqual('edge[cell|1-0:LEFT]')
  })

  it('should get previous edge', async () => {
    const grid = new TestGrid()
    const cell = grid.getCell({row: 1, col: 1})
    const edge = new TestEdges(grid, cell).get('LEFT')

    const previousEdge = edge.getPreviousEdge()

    expect(previousEdge.id).toEqual('edge[cell|1-1:cell|1-2]')
  })

  it('should get next edge', async () => {
    const grid = new TestGrid()
    const cell = grid.getCell({row: 1, col: 1})
    const edge = new TestEdges(grid, cell).get('LEFT')

    const previousEdge = edge.getNextEdge()

    expect(previousEdge.id).toEqual('edge[cell|1-1:cell|1-2]')
  })
})
