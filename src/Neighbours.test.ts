import {Grid} from './Grid';
import {Neighbours} from './Neighbours';
import {preInitializedGridOptionsFixture} from './Grid.fixture';
import {Coordinate} from './Coordinate';
import {Cell} from './Cell';

describe('Neighbours', () => {
  let grid: Grid<string>;

  beforeEach(() => {
    grid = new Grid<string>(preInitializedGridOptionsFixture);
  });

  it.each`
    direction         | neighbourCoordinates
    ${'TOP'}          | ${{row: 0, col: 1, direction: 'TOP', source: {row: 1, col: 1}}}
    ${'BOTTOM'}       | ${{row: 2, col: 1, direction: 'BOTTOM', source: {row: 1, col: 1}}}
    ${'LEFT'}         | ${{row: 1, col: 0, direction: 'LEFT', source: {row: 1, col: 1}}}
    ${'RIGHT'}        | ${{row: 1, col: 2, direction: 'RIGHT', source: {row: 1, col: 1}}}
    ${'TOP_LEFT'}     | ${{row: 0, col: 0, direction: 'TOP_LEFT', source: {col: 1, row: 1}}},
    ${'TOP_RIGHT'}    | ${{row: 0, col: 2, direction: 'TOP_RIGHT', source: {col: 1, row: 1}}},
    ${'BOTTOM_LEFT'}  | ${{row: 2, col: 0, direction: 'BOTTOM_LEFT', source: {col: 1, row: 1}}},
    ${'BOTTOM_RIGHT'} | ${{row: 2, col: 2, direction: 'BOTTOM_RIGHT', source: {col: 1, row: 1}}},
  `('should get neighbour coordinates ($direction)', async ({direction, neighbourCoordinates}) => {
    const startCoordinates: Coordinate = {row: 1, col: 1};
    const result = new Neighbours(grid, startCoordinates).getCoordinate(direction);
    expect(result).toEqual(neighbourCoordinates);
  });

  it.each`
    coordinates         | direction
    ${{row: 0, col: 0}} | ${'TOP'}
    ${{row: 2, col: 2}} | ${'BOTTOM'}
    ${{row: 0, col: 0}} | ${'LEFT'}
    ${{row: 2, col: 2}} | ${'RIGHT'}
    ${{row: 0, col: 0}} | ${'TOP_LEFT'}
    ${{row: 0, col: 0}} | ${'TOP_RIGHT'}
    ${{row: 2, col: 2}} | ${'BOTTOM_LEFT'}
    ${{row: 2, col: 2}} | ${'BOTTOM_RIGHT'}
  `('should not get neighbour coordinate out of bounds', async ({coordinates, direction}) => {
    expect(() => new Neighbours(grid, coordinates).getCoordinate(direction)).toThrowError();
  });

  it('should get neighbours coordinates ', async () => {
    const result = new Neighbours(grid, {row: 1, col: 1}).listCoordinates();
    expect(result).toEqual([
      {row: 0, col: 1, direction: 'TOP', source: {row: 1, col: 1}},
      {row: 2, col: 1, direction: 'BOTTOM', source: {row: 1, col: 1}},
      {row: 1, col: 0, direction: 'LEFT', source: {row: 1, col: 1}},
      {row: 1, col: 2, direction: 'RIGHT', source: {row: 1, col: 1}},
      {row: 0, col: 0, direction: 'TOP_LEFT', source: {col: 1, row: 1}},
      {row: 0, col: 2, direction: 'TOP_RIGHT', source: {col: 1, row: 1}},
      {row: 2, col: 0, direction: 'BOTTOM_LEFT', source: {col: 1, row: 1}},
      {row: 2, col: 2, direction: 'BOTTOM_RIGHT', source: {col: 1, row: 1}},
    ]);
  });

  it('should not get neighbours coordinates out of bounds ', async () => {
    const result = new Neighbours(grid, {row: 2, col: 2}).listCoordinates();
    expect(result).toEqual([
      {row: 1, col: 2, direction: 'TOP', source: {row: 2, col: 2}},
      {row: 2, col: 1, direction: 'LEFT', source: {row: 2, col: 2}},
      {row: 1, col: 1, direction: 'TOP_LEFT', source: {col: 2, row: 2}},
    ]);
  });

  it.each`
    direction         | neighbourValue
    ${'TOP'}          | ${'0-1'}
    ${'BOTTOM'}       | ${'2-1'}
    ${'LEFT'}         | ${'1-0'}
    ${'RIGHT'}        | ${'1-2'}
    ${'TOP_LEFT'}     | ${'0-0'}
    ${'TOP_RIGHT'}    | ${'0-2'}
    ${'BOTTOM_LEFT'}  | ${'2-0'}
    ${'BOTTOM_RIGHT'} | ${'2-2'}
  `('should get neighbour cell', async ({direction, neighbourValue}) => {
    const startCoordinates: Coordinate = {row: 1, col: 1};
    const cell = new Neighbours(grid, startCoordinates).get(direction);
    expect(cell.value).toEqual(neighbourValue);
  });

  it.each`
    coordinates    | direction
    ${{row: 0, col: 0}} | ${'TOP'}
    ${{row: 2, col: 2}} | ${'BOTTOM'}
    ${{row: 0, col: 0}} | ${'LEFT'}
    ${{row: 2, col: 2}} | ${'RIGHT'}
    ${{row: 0, col: 0}} | ${'TOP_LEFT'}
    ${{row: 0, col: 0}} | ${'TOP_RIGHT'}
    ${{row: 2, col: 2}} | ${'BOTTOM_LEFT'}
    ${{row: 2, col: 2}} | ${'BOTTOM_RIGHT'}
  `('should not get neighbour out of bounds ($direction)', async ({coordinates, direction}) => {
    expect(() => new Neighbours(grid, coordinates).get(direction)).toThrowError();
  });

  it('should get neighbour cells', async () => {
    const result = new Neighbours(grid, {row: 1, col: 1}).list();
    expect(toValues(result)).toEqual(['0-1', '2-1', '1-0', '1-2', '0-0', '0-2', '2-0', '2-2']);
  });

  it.each`
    coordinates         | expectedNeighbours
    ${{row: 0, col: 0}} | ${['1-0', '0-1', '1-1']}
    ${{row: 2, col: 2}} | ${['1-2', '2-1', '1-1']}
    `('should not get neighbours out of bounds ($coordinates)', async ({coordinates, expectedNeighbours}) => {
    const result = new Neighbours(grid, coordinates).list();
    expect(toValues(result)).toEqual(expectedNeighbours);
  });
});

function toValues<T>(cells: Cell<T>[]): T[] {
  return cells.map(cell => cell.value);
}
