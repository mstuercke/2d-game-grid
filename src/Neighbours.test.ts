import {Grid} from './Grid';
import {gridFixture} from './Grid.fixture';
import {Neighbours} from './Neighbours';

describe('grid', () => {
  let grid: Grid<string>;
  let neighbours: Neighbours<string>;

  beforeEach(() => {
    grid = gridFixture.clone();
    neighbours = new Neighbours(grid)
  });

  it.each`
    startCoordinates    | direction   | neighbourCoordinates
    ${{row: 1, col: 1}} | ${'UP'}     | ${{row: 0, col: 1, direction: 'UP'}}
    ${{row: 1, col: 1}} | ${'DOWN'}   | ${{row: 2, col: 1, direction: 'DOWN'}}
    ${{row: 1, col: 1}} | ${'LEFT'}   | ${{row: 1, col: 0, direction: 'LEFT'}}
    ${{row: 1, col: 1}} | ${'RIGHT'}  | ${{row: 1, col: 2, direction: 'RIGHT'}}
  `('should get neighbour coordinates ($direction)', async ({startCoordinates, direction, neighbourCoordinates}) => {
    const result = neighbours.getCoordinate(startCoordinates, direction);
    expect(result).toEqual(neighbourCoordinates);
  });

  it('should get neighbours coordinates ', async () => {
    const result = neighbours.getCoordinates({row: 1, col: 1});
    expect(result).toEqual([
      {row: 0, col: 1, direction: 'UP'},
      {row: 2, col: 1, direction: 'DOWN'},
      {row: 1, col: 0, direction: 'LEFT'},
      {row: 1, col: 2, direction: 'RIGHT'},
    ]);
  });

  it('should not get neighbours coordinates out of bounds ', async () => {
    const result = neighbours.getCoordinates({row: 2, col: 2});
    expect(result).toEqual([
      {row: 1, col: 2, direction: 'UP'},
      {row: 2, col: 1, direction: 'LEFT'},
    ]);
  });

  it.each`
    startCoordinates    | direction   | neighbourValue
    ${{row: 1, col: 1}} | ${'UP'}     | ${'0-1'}
    ${{row: 1, col: 1}} | ${'DOWN'}   | ${'2-1'}
    ${{row: 1, col: 1}} | ${'LEFT'}   | ${'1-0'}
    ${{row: 1, col: 1}} | ${'RIGHT'}  | ${'1-2'}
  `('should get neighbour cell', async ({startCoordinates, direction, neighbourValue}) => {
    const result = neighbours.get(startCoordinates, direction);
    expect(result).toEqual(neighbourValue);
  });

  it.each`
    coordinates    | direction
    ${{row: 0, col: 0}} | ${'UP'}
    ${{row: 2, col: 2}} | ${'DOWN'}
    ${{row: 0, col: 0}} | ${'LEFT'}
    ${{row: 2, col: 2}} | ${'RIGHT'}
  `('should not get neighbour out of bounds ($direction)', async ({coordinates, direction}) => {
    const neighbour = neighbours.get(coordinates, direction);
    expect(neighbour).not.toBeDefined();
  });

  it('should get neighbour cells', async () => {
    const result = neighbours.list({row: 1, col: 1});
    expect(result).toEqual(['0-1', '2-1', '1-0', '1-2']);
  });

  it.each`
    coordinates         | expectedNeighbours
    ${{row: 0, col: 0}} | ${['1-0', '0-1']}
    ${{row: 2, col: 2}} | ${['1-2', '2-1']}
    `('should not get neighbours out of bounds ($coordinates)', async ({coordinates, expectedNeighbours}) => {
    const result = neighbours.list(coordinates);
    expect(result).toEqual(expectedNeighbours);
  });

  it('should clone grid', async () => {
    const clone = grid.clone((value) => `${value} (clone)`);
    expect(clone.listCells()).toEqual([
      '0-0 (clone)', '0-1 (clone)', '0-2 (clone)',
      '1-0 (clone)', '1-1 (clone)', '1-2 (clone)',
      '2-0 (clone)', '2-1 (clone)', '2-2 (clone)',
    ]);
  });
});
