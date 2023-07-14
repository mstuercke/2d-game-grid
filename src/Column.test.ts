import {Column} from './Column';
import {Grid} from './Grid';
import {preInitializedGridOptionsFixture} from './Grid.fixture';

describe('Column', () => {
  let column: Column<string>;

  beforeEach(() => {
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    column = new Column(grid, 2);
  });

  it('should have correct id', async () => {
    expect(column.id).toEqual('column|2');
  });

  it('should list cells', async () => {
    const cells = column.cells;
    const cellValues = cells.map(cell => cell.value);
    expect(cellValues).toEqual(['0-2', '1-2', '2-2']);
  });

  it('should get cell', async () => {
    const cell = column.getCell(1);
    expect(cell.value).toEqual('1-2');
  });
});
