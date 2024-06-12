import {Heuristic} from 'pathfinding'
import {Grid} from '../../../Grid'
import {preInitializedGridOptionsFixture} from '../../../Grid.fixture'
import {mapHeuristic} from './mapHeuristic'

describe('mapHeuristic', () => {
  let grid: Grid<string>
  beforeEach(() => {
    grid = new Grid(preInitializedGridOptionsFixture)
  })

  it('should return manhattan heuristic', async () => {
    expect(mapHeuristic(grid, 'MANHATTAN')).toEqual(Heuristic.manhattan)
  })

  it('should return chebyshev heuristic', async () => {
    expect(mapHeuristic(grid, 'CHEBYSHEV')).toEqual(Heuristic.chebyshev)
  })

  it('should return euclidean heuristic', async () => {
    expect(mapHeuristic(grid, 'EUCLIDEAN')).toEqual(Heuristic.euclidean)
  })

  it('should return octile heuristic', async () => {
    expect(mapHeuristic(grid, 'OCTILE')).toEqual(Heuristic.octile)
  })

  it('should return custom heuristic', async () => {
    const customHeuristic = jest.fn().mockReturnValueOnce(4)
    const heuristicValue = mapHeuristic(grid, customHeuristic)(2, 1)

    expect(heuristicValue).toEqual(4)
    expect(customHeuristic).toHaveBeenCalledWith(grid.getCell({row: 1, col: 2}))
  })
})
