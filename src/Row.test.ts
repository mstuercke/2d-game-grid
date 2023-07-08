import {Row} from './Row';
import {Grid} from './Grid';
import {preInitializedGridOptionsFixture} from './Grid.fixture';

describe('Row', () => {
  it('should list cells', async () => {
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    const cells = new Row(grid, 2).cells;
    const cellValues = cells.map(cell => cell.value);
    expect(cellValues).toEqual(['2-0', '2-1', '2-2']);
  });

  it('should get cell', async () => {
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    const cell = new Row(grid, 2).getCell(1);
    expect(cell.value).toEqual('2-1');
  });
});
