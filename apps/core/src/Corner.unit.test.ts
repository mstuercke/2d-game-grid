import {TestCorners} from './Corners.fixture.js'
import {TestGrid} from './Grid.fixture.js'
import {Corner} from './Corner.js'

describe(Corner.name, () => {
  it('should create the same id for source and adjacent cells', () => {
    const grid = new TestGrid()
    const expectedCornerId = 'corner[0-1|0-2|1-1|1-2]'

    const cell1 = grid.getCell({row: 1, col: 1})
    const corner1 = new TestCorners(grid, cell1).get('TOP_RIGHT')
    expect(corner1.id).toEqual(expectedCornerId)

    const cell2 = grid.getCell({row: 0, col: 2})
    const corner2 = new TestCorners(grid, cell2).get('BOTTOM_LEFT')
    expect(corner2.id).toEqual(expectedCornerId)

    const cell3 = grid.getCell({row: 1, col: 2})
    const corner3 = new TestCorners(grid, cell3).get('TOP_LEFT')
    expect(corner3.id).toEqual(expectedCornerId)

    const cell4 = grid.getCell({row: 0, col: 1})
    const corner4 = new TestCorners(grid, cell4).get('BOTTOM_RIGHT')
    expect(corner4.id).toEqual(expectedCornerId)
  })

  it('should generate id, even if no neighbor is present', () => {
    const grid = new TestGrid()

    const cell = grid.getCell({row: 0, col: 0})
    const corner = new TestCorners(grid, cell).get('TOP_LEFT')
    expect(corner.id).toEqual('corner[0-0|TOP_LEFT]')
  })
})
