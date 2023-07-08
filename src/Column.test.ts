import {Column} from './Column';
import {Grid} from './Grid';
import {preInitializedGridOptionsFixture} from './Grid.fixture';

describe('Column', () => {
  it('should list cells', async () => {
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    const cells = new Column(grid, 2).listCells();
    const cellValues = cells.map(cell => cell.value);
    expect(cellValues).toEqual(['0-2', '1-2', '2-2']);
  });

  it('should get cell', async () => {
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    const cell = new Column(grid, 2).getCell(1);
    expect(cell.value).toEqual('1-2');
  });
});
