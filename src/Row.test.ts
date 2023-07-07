import {Row} from './Row';
import {gridFixture} from './Grid.fixture';

describe('Row', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list cells', async () => {
    const cells = new Row(gridFixture, 2).listCells();
    expect(cells).toEqual(['2-0', '2-1', '2-2']);
  });

  it('should get cell', async () => {
    const value = new Row(gridFixture, 2).getCell(1);
    expect(value).toEqual('2-1');
  });

  it('should set cell', async () => {
    const grid = gridFixture.clone()
    jest.spyOn(grid, 'setCell')

    new Row(grid, 2).setCell(1, 'foo');

    expect(grid.setCell).toHaveBeenCalledWith({row: 2, col: 1}, 'foo');
  });
});
