import {preInitializedGridOptionsFixture, TestGrid} from './Grid.fixture'
import type {Coordinate} from './Coordinate'
import {TestNeighbors} from './Neighbors.fixture'
import type {TestCell} from './Cell.fixture'

describe('Neighbors', () => {
  let grid: TestGrid

  beforeEach(() => {
    grid = new TestGrid(preInitializedGridOptionsFixture)
  })

  it.each`
    direction  | neighborCoordinates
    ${'LEFT'}  | ${{row: 1, col: 0, direction: 'LEFT', source: {row: 1, col: 1}}}
    ${'RIGHT'} | ${{row: 1, col: 2, direction: 'RIGHT', source: {row: 1, col: 1}}}
  `('should get neighbor coordinates ($direction)', async ({direction, neighborCoordinates}) => {
    const startCoordinates: Coordinate = {row: 1, col: 1}
    const result = new TestNeighbors(grid, startCoordinates).getCoordinate(direction)
    expect(result).toEqual(neighborCoordinates)
  })

  it.each`
    coordinate          | direction
    ${{row: 0, col: 0}} | ${'LEFT'}
    ${{row: 2, col: 3}} | ${'RIGHT'}
  `('should not get neighbor coordinate out of bounds for $coordinate in direction $direction', async ({coordinate, direction}) => {
    expect(() => new TestNeighbors(grid, coordinate).getCoordinate(direction)).toThrow()
  })

  it('should get neighbors coordinates', async () => {
    const result = new TestNeighbors(grid, {row: 1, col: 1}).listCoordinates(['LEFT', 'RIGHT'])
    expect(result).toEqual([
      {row: 1, col: 0, direction: 'LEFT', source: {row: 1, col: 1}},
      {row: 1, col: 2, direction: 'RIGHT', source: {row: 1, col: 1}},
    ])
  })

  it('should not get neighbors coordinates out of bounds', async () => {
    const result = new TestNeighbors(grid, {row: 2, col: 3}).listCoordinates(['LEFT', 'RIGHT'])
    expect(result).toEqual([{row: 2, col: 2, direction: 'LEFT', source: {row: 2, col: 3}}])
  })

  it.each`
    direction  | neighborValue
    ${'LEFT'}  | ${'1-0'}
    ${'RIGHT'} | ${'1-2'}
  `('should get neighbor cell', async ({direction, neighborValue}) => {
    const startCoordinates: Coordinate = {row: 1, col: 1}
    const cell = new TestNeighbors(grid, startCoordinates).get(direction)
    expect(cell.value).toEqual(neighborValue)
  })

  it.each`
    coordinates         | direction
    ${{row: 0, col: 0}} | ${'LEFT'}
    ${{row: 2, col: 3}} | ${'RIGHT'}
  `('should not get neighbor out of bounds ($direction)', async ({coordinates, direction}) => {
    expect(() => new TestNeighbors(grid, coordinates).get(direction)).toThrow()
  })

  it('should get neighbor cells', async () => {
    const result = new TestNeighbors(grid, {row: 1, col: 1}).list(['LEFT', 'RIGHT'])
    expect(toValues(result)).toEqual(['1-0', '1-2'])
  })

  it.each`
    coordinates         | expectedNeighbors
    ${{row: 0, col: 0}} | ${['0-1']}
    ${{row: 2, col: 3}} | ${['2-2']}
  `('should not get neighbors out of bounds ($coordinates)', async ({coordinates, expectedNeighbors}) => {
    const result = new TestNeighbors(grid, coordinates).list(['LEFT', 'RIGHT'])
    expect(toValues(result)).toEqual(expectedNeighbors)
  })
})

function toValues(cells: TestCell[]): string[] {
  return cells.map((cell) => cell.value)
}
