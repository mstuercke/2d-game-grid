import {Column} from './Column';
import {Grid} from './Grid';
import {preInitializedGridOptionsFixture} from './Grid.fixture';

describe('Column', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list cells', async () => {
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    const cells = new Column(grid, 2).listCells();
    expect(cells).toEqual(['0-2', '1-2', '2-2']);
  });

  it('should get cell', async () => {
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    const value = new Column(grid, 2).getCell(1);
    expect(value).toEqual('1-2');
  });

  it('should set cell', async () => {
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    jest.spyOn(grid, 'setCell');

    new Column(grid, 2).setCell(1, 'foo');

    expect(grid.setCell).toHaveBeenCalledWith({row: 1, col: 2}, 'foo');
  });
});
