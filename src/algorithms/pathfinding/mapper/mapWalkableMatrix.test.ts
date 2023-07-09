import {mapWalkableMatrix} from './mapWalkableMatrix';
import {Grid} from '../../../Grid';
import {preInitializedGridOptionsFixture} from '../../../Grid.fixture';
import {Cell} from '../../../Cell';

describe('mapWalkableMatrix', () => {
  it('should map correctly', async () => {
    const grid = new Grid(preInitializedGridOptionsFixture);
    const isWalkable = (cell: Cell<string>) => cell.coordinate.col === cell.coordinate.row;
    expect(mapWalkableMatrix(grid, isWalkable)).toEqual([
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ]);
  });
});
