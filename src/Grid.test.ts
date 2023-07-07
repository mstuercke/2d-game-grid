import {Grid} from './Grid';
import {gridFixture} from './Grid.fixture';

describe('grid', () => {
  let grid: Grid<string>;

  beforeEach(() => {
    grid = gridFixture.clone();
  });

  it('should get all cells', async () => {
    const cells = grid.listCells();
    expect(cells).toEqual([
      '0-0', '0-1', '0-2',
      '1-0', '1-1', '1-2',
      '2-0', '2-1', '2-2',
    ]);
  });

  it('should get rows', async () => {
    const rows = grid.listRows();
    expect(rows).toEqual([
      ['0-0', '0-1', '0-2'],
      ['1-0', '1-1', '1-2'],
      ['2-0', '2-1', '2-2'],
    ]);
  });

  it('should get cell', async () => {
    const cell = grid.getCell({row: 1, col: 2});
    expect(cell).toEqual('1-2');
  });

  it('should set cell', async () => {
    const coordinates = {row: 1, col: 2};
    grid.setCell(coordinates, "foo");
    expect(grid.getCell(coordinates)).toEqual("foo");
  });

  it('should not set cell out of bounds', async () => {
    const coordinates = {row: 1, col: 3};
    grid.setCell(coordinates, "foo");
    expect(grid.listCells()).not.toContain("foo")
    expect(grid.listCells().length).toEqual(9)
  });

  it.each`
    coordinates
    ${{row: -1, col: 0}}
    ${{row: 0, col: -1}}
    ${{row: 3, col: 0}}
    ${{row: 0, col: 3}}
    ${{row: -1, col: -1}}
    ${{row: 3, col: 3}}
`('should not get cell that is out of bounds ($coordinates)', async ({coordinates}) => {
    const cell = grid.getCell(coordinates);
    expect(cell).not.toBeDefined();
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
