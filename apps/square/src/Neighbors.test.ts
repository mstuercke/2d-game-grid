import {Grid} from './Grid'
import {Neighbors} from './Neighbors'
import {preInitializedGridOptionsFixture} from './Grid.fixture'
import type {Coordinate} from './Coordinate'
import type {Cell} from './Cell'

describe('Neighbors', () => {
  let grid: Grid<string>

  beforeEach(() => {
    grid = new Grid<string>(preInitializedGridOptionsFixture)
  })

  it.each`
    direction         | neighborCoordinates
    ${'TOP'}          | ${{row: 0, col: 1, direction: 'TOP', source: {row: 1, col: 1}}}
    ${'BOTTOM'}       | ${{row: 2, col: 1, direction: 'BOTTOM', source: {row: 1, col: 1}}}
    ${'LEFT'}         | ${{row: 1, col: 0, direction: 'LEFT', source: {row: 1, col: 1}}}
    ${'RIGHT'}        | ${{row: 1, col: 2, direction: 'RIGHT', source: {row: 1, col: 1}}}
    ${'TOP_LEFT'}     | ${{row: 0, col: 0, direction: 'TOP_LEFT', source: {col: 1, row: 1}}}
    ${'TOP_RIGHT'}    | ${{row: 0, col: 2, direction: 'TOP_RIGHT', source: {col: 1, row: 1}}}
    ${'BOTTOM_LEFT'}  | ${{row: 2, col: 0, direction: 'BOTTOM_LEFT', source: {col: 1, row: 1}}}
    ${'BOTTOM_RIGHT'} | ${{row: 2, col: 2, direction: 'BOTTOM_RIGHT', source: {col: 1, row: 1}}}
  `('should get neighbor coordinates ($direction)', async ({direction, neighborCoordinates}) => {
    const startCoordinates: Coordinate = {row: 1, col: 1}
    const result = new Neighbors(grid, startCoordinates).getCoordinate(direction)
    expect(result).toEqual(neighborCoordinates)
  })

  it.each`
    coordinate          | direction
    ${{row: 0, col: 0}} | ${'TOP'}
    ${{row: 2, col: 2}} | ${'BOTTOM'}
    ${{row: 0, col: 0}} | ${'LEFT'}
    ${{row: 2, col: 3}} | ${'RIGHT'}
    ${{row: 0, col: 0}} | ${'TOP_LEFT'}
    ${{row: 0, col: 0}} | ${'TOP_RIGHT'}
    ${{row: 2, col: 2}} | ${'BOTTOM_LEFT'}
    ${{row: 2, col: 2}} | ${'BOTTOM_RIGHT'}
  `(
    'should not get neighbor coordinate out of bounds for $coordinate in direction $direction',
    async ({coordinate, direction}) => {
      expect(() => new Neighbors(grid, coordinate).getCoordinate(direction)).toThrowError()
    },
  )

  it('should get neighbors coordinates ', async () => {
    const result = new Neighbors(grid, {row: 1, col: 1}).listCoordinates()
    expect(result).toEqual([
      {row: 0, col: 1, direction: 'TOP', source: {row: 1, col: 1}},
      {row: 2, col: 1, direction: 'BOTTOM', source: {row: 1, col: 1}},
      {row: 1, col: 0, direction: 'LEFT', source: {row: 1, col: 1}},
      {row: 1, col: 2, direction: 'RIGHT', source: {row: 1, col: 1}},
      {row: 0, col: 0, direction: 'TOP_LEFT', source: {col: 1, row: 1}},
      {row: 0, col: 2, direction: 'TOP_RIGHT', source: {col: 1, row: 1}},
      {row: 2, col: 0, direction: 'BOTTOM_LEFT', source: {col: 1, row: 1}},
      {row: 2, col: 2, direction: 'BOTTOM_RIGHT', source: {col: 1, row: 1}},
    ])
  })

  it('should not get neighbors coordinates out of bounds', async () => {
    const result = new Neighbors(grid, {row: 2, col: 3}).listCoordinates()
    expect(result).toEqual([
      {row: 1, col: 3, direction: 'TOP', source: {row: 2, col: 3}},
      {row: 2, col: 2, direction: 'LEFT', source: {row: 2, col: 3}},
      {row: 1, col: 2, direction: 'TOP_LEFT', source: {row: 2, col: 3}},
    ])
  })

  it.each`
    direction         | neighborValue
    ${'TOP'}          | ${'0-1'}
    ${'BOTTOM'}       | ${'2-1'}
    ${'LEFT'}         | ${'1-0'}
    ${'RIGHT'}        | ${'1-2'}
    ${'TOP_LEFT'}     | ${'0-0'}
    ${'TOP_RIGHT'}    | ${'0-2'}
    ${'BOTTOM_LEFT'}  | ${'2-0'}
    ${'BOTTOM_RIGHT'} | ${'2-2'}
  `('should get neighbor cell', async ({direction, neighborValue}) => {
    const startCoordinates: Coordinate = {row: 1, col: 1}
    const cell = new Neighbors(grid, startCoordinates).get(direction)
    expect(cell.value).toEqual(neighborValue)
  })

  it.each`
    coordinates         | direction
    ${{row: 0, col: 0}} | ${'TOP'}
    ${{row: 2, col: 2}} | ${'BOTTOM'}
    ${{row: 0, col: 0}} | ${'LEFT'}
    ${{row: 2, col: 3}} | ${'RIGHT'}
    ${{row: 0, col: 0}} | ${'TOP_LEFT'}
    ${{row: 0, col: 0}} | ${'TOP_RIGHT'}
    ${{row: 2, col: 2}} | ${'BOTTOM_LEFT'}
    ${{row: 2, col: 2}} | ${'BOTTOM_RIGHT'}
  `('should not get neighbor out of bounds ($direction)', async ({coordinates, direction}) => {
    expect(() => new Neighbors(grid, coordinates).get(direction)).toThrowError()
  })

  it('should get neighbor cells', async () => {
    const result = new Neighbors(grid, {row: 1, col: 1}).list()
    expect(toValues(result)).toEqual(['0-1', '2-1', '1-0', '1-2', '0-0', '0-2', '2-0', '2-2'])
  })

  it.each`
    coordinates         | expectedNeighbors
    ${{row: 0, col: 0}} | ${['1-0', '0-1', '1-1']}
    ${{row: 2, col: 3}} | ${['1-3', '2-2', '1-2']}
  `('should not get neighbors out of bounds ($coordinates)', async ({coordinates, expectedNeighbors}) => {
    const result = new Neighbors(grid, coordinates).list()
    expect(toValues(result)).toEqual(expectedNeighbors)
  })
})

function toValues<T>(cells: Cell<T>[]): T[] {
  return cells.map((cell) => cell.value)
}
