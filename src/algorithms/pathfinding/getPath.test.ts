import {Grid} from '../../Grid';
import {preInitializedGridOptionsFixture} from '../../Grid.fixture';
import {Coordinate} from '../../Coordinate';
import {Cell} from '../../Cell';
import {PathfindingOptions} from './PathfindingOptions';
import {getPath} from './getPath';
import * as mapPathfindingDiagonalMovementModule from './mapper/mapPathfindingDiagonalMovement';
import * as mapWalkableMatrixModule from './mapper/mapWalkableMatrix';
import * as mapFinderModule from './mapper/mapFinder';
import * as mapHeuristicModule from './mapper/mapHeuristic';

describe('getPath', () => {
  let grid: Grid<string>;
  const start: Coordinate = {row: 0, col: 0};
  const end: Coordinate = {row: 1, col: 2};

  beforeEach(() => {
    grid = new Grid(preInitializedGridOptionsFixture);
  });

  it('should calculate path', async () => {
    const options: PathfindingOptions<string> = {
      algorithm: 'BREADTH_FIRST',
      diagonalMovement: 'NEVER',
      heuristic: 'EUCLIDEAN',
      isWalkable: ({row, col}: Cell<string>) => !(row !== 2 && col === 1),
    };

    const path = getPath(grid, start, end, options);
    expect(path.map(cell => cell.value)).toEqual([
      '0-0', '1-0', '2-0', '2-1', '2-2', '1-2',
    ]);
  });

  describe('options', () => {
    const mapFinderSpy = jest.spyOn(mapFinderModule, 'mapFinder');
    const mapDiagonalMovementSpy = jest.spyOn(mapPathfindingDiagonalMovementModule, 'mapPathfindingDiagonalMovement');
    const mapHeuristicSpy = jest.spyOn(mapHeuristicModule, 'mapHeuristic');
    const mapWalkableMatrixSpy = jest.spyOn(mapWalkableMatrixModule, 'mapWalkableMatrix');

    beforeEach(() => jest.clearAllMocks());

    it('should use defaults', async () => {
      getPath(grid, start, end);

      expect(mapFinderSpy).toHaveBeenCalledWith('A_STAR', expect.anything());
      expect(mapDiagonalMovementSpy).toHaveBeenCalledWith('ALWAYS');
      expect(mapHeuristicSpy).toHaveBeenCalledWith(grid, 'MANHATTAN');
      expect(mapWalkableMatrixSpy).toHaveBeenCalledWith(grid, expect.any(Function));
    });

    it('should use algorithm', async () => {
      getPath(grid, start, end, {algorithm: 'BREADTH_FIRST'});
      expect(mapFinderSpy).toHaveBeenCalledWith('BREADTH_FIRST', expect.anything());
    });

    it('should use diagonalMovement', async () => {
      getPath(grid, start, end, {diagonalMovement: 'NEVER'});
      expect(mapDiagonalMovementSpy).toHaveBeenCalledWith('NEVER');
    });

    it('should use heuristic', async () => {
      getPath(grid, start, end, {heuristic: 'EUCLIDEAN'});
      expect(mapHeuristicSpy).toHaveBeenCalledWith(grid, 'EUCLIDEAN');
    });

    it('should use isWalkable', async () => {
      const isWalkable = jest.fn();
      getPath(grid, start, end, {isWalkable});
      expect(mapWalkableMatrixSpy).toHaveBeenCalledWith(grid, isWalkable);
    });
  });
});
