import {Row} from './Row';
import {Grid} from './Grid';
import {preInitializedGridOptionsFixture} from './Grid.fixture';

describe('Row', () => {
  let row: Row<string>;

  beforeEach(() => {
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    row = new Row(grid, 2);
  });

  it('should have correct id', async () => {
    expect(row.id).toEqual('row|2');
  });

  it('should list cells', async () => {
    const cells = row.cells;
    const cellValues = cells.map(cell => cell.value);
    expect(cellValues).toEqual(['2-0', '2-1', '2-2', '2-3']);
  });

  it('should get cell', async () => {
    const cell = row.getCell(1);
    expect(cell.value).toEqual('2-1');
  });
});
