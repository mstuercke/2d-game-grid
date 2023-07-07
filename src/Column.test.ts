import {Column} from './Column';
import {gridFixture} from './Grid.fixture';

describe('Column', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list cells', async () => {
    const cells = new Column(gridFixture, 2).listCells();
    expect(cells).toEqual(['0-2', '1-2', '2-2']);
  });

  it('should get cell', async () => {
    const value = new Column(gridFixture, 2).getCell(1);
    expect(value).toEqual('1-2');
  });

  it('should set cell', async () => {
    const grid = gridFixture.clone()
    jest.spyOn(grid, 'setCell')

    new Column(grid, 2).setCell(1, 'foo');

    expect(grid.setCell).toHaveBeenCalledWith({row: 1, col: 2}, 'foo');
  });
});
