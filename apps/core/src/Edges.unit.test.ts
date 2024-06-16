import {Edges} from './Edges'
import {TestGrid} from './Grid.fixture'
import {TestEdges} from './Edges.fixture'

describe(Edges.name, () => {
  it.each`
    direction  | edgeId
    ${'LEFT'}  | ${'edge[cell|1-0:cell|1-1]'}
    ${'RIGHT'} | ${'edge[cell|1-1:cell|1-2]'}
  `(`should get $direction edge`, ({direction, edgeId}) => {
    const grid = new TestGrid()

    const cell = grid.getCell({row: 1, col: 1})
    const edge = new TestEdges(grid, cell).get(direction)

    expect(edge.id).toEqual(edgeId)
  })

  it('should list all edges', () => {
    const grid = new TestGrid()

    const cell = grid.getCell({row: 1, col: 1})
    const edges = new TestEdges(grid, cell).list(['LEFT', 'RIGHT'])

    expect(edges.map((edge) => edge.id)).toEqual([
      'edge[cell|1-0:cell|1-1]', // left
      'edge[cell|1-1:cell|1-2]', // right
    ])
  })
})
