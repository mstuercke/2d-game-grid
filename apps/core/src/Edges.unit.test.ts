import {Edges} from './Edges.js'
import {TestGrid} from './Grid.fixture.js'
import {TestEdges} from './Edges.fixture.js'

describe(Edges.name, () => {
  it.each`
    direction  | edgeId
    ${'LEFT'}  | ${'edge[1-0|1-1]'}
    ${'RIGHT'} | ${'edge[1-1|1-2]'}
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
      'edge[1-0|1-1]', // left
      'edge[1-1|1-2]', // right
    ])
  })
})
