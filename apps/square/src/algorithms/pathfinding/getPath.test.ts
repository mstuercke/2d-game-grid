import {SquareGrid} from '../../SquareGrid.js'
import {preInitializedGridOptionsFixture} from '../../SquareGrid.fixture.js'
import type {Coordinate} from '@2d-game-grid/core'
import type {SquareCell} from '../../SquareCell.js'
import type {PathfindingOptions} from './PathfindingOptions.js'
import {getPath} from './getPath.js'
import * as mapPathfindingDiagonalMovementModule from './mapper/mapPathfindingDiagonalMovement.js'
import * as mapWalkableMatrixModule from './mapper/mapWalkableMatrix.js'
import * as mapFinderModule from './mapper/mapFinder.js'
import * as mapHeuristicModule from './mapper/mapHeuristic.js'

describe('getPath', () => {
  let grid: SquareGrid<string>
  const start: Coordinate = {row: 0, col: 0}
  const end: Coordinate = {row: 1, col: 2}

  beforeEach(() => {
    grid = new SquareGrid(preInitializedGridOptionsFixture)
  })

  it('should calculate path', async () => {
    const options: PathfindingOptions<string> = {
      algorithm: 'BREADTH_FIRST',
      diagonalMovement: 'NEVER',
      heuristic: 'EUCLIDEAN',
      isWalkable: ({row, col}: SquareCell<string>) => !(row !== 2 && col === 1),
    }

    const path = getPath(grid, start, end, options)
    expect(path.map((cell) => cell.value)).toEqual(['0-0', '1-0', '2-0', '2-1', '2-2', '1-2'])
  })

  describe('options', () => {
    const mapFinderSpy = vi.spyOn(mapFinderModule, 'mapFinder')
    const mapDiagonalMovementSpy = vi.spyOn(mapPathfindingDiagonalMovementModule, 'mapPathfindingDiagonalMovement')
    const mapHeuristicSpy = vi.spyOn(mapHeuristicModule, 'mapHeuristic')
    const mapWalkableMatrixSpy = vi.spyOn(mapWalkableMatrixModule, 'mapWalkableMatrix')

    it('should use defaults', async () => {
      getPath(grid, start, end)

      expect(mapFinderSpy).toHaveBeenCalledWith('A_STAR', expect.anything())
      expect(mapDiagonalMovementSpy).toHaveBeenCalledWith('ALWAYS')
      expect(mapHeuristicSpy).toHaveBeenCalledWith(grid, 'MANHATTAN')
      expect(mapWalkableMatrixSpy).toHaveBeenCalledWith(grid, expect.any(Function))
    })

    it('should use algorithm', async () => {
      getPath(grid, start, end, {algorithm: 'BREADTH_FIRST'})
      expect(mapFinderSpy).toHaveBeenCalledWith('BREADTH_FIRST', expect.anything())
    })

    it('should use diagonalMovement', async () => {
      getPath(grid, start, end, {diagonalMovement: 'NEVER'})
      expect(mapDiagonalMovementSpy).toHaveBeenCalledWith('NEVER')
    })

    it('should use heuristic', async () => {
      getPath(grid, start, end, {heuristic: 'EUCLIDEAN'})
      expect(mapHeuristicSpy).toHaveBeenCalledWith(grid, 'EUCLIDEAN')
    })

    it('should use isWalkable', async () => {
      const isWalkable = vi.fn()
      getPath(grid, start, end, {isWalkable})
      expect(mapWalkableMatrixSpy).toHaveBeenCalledWith(grid, isWalkable)
    })
  })
})
