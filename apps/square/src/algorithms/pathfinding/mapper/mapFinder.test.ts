import * as pathfinding from 'pathfinding'
import {mapFinder} from './mapFinder.js'

vi.mock('pathfinding', () => ({
  AStarFinder: vi.fn(),
  BestFirstFinder: vi.fn(),
  BreadthFirstFinder: vi.fn(),
  DijkstraFinder: vi.fn(),
}))
const AStarFinderMock = vi.mocked(pathfinding.AStarFinder)
const BestFirstFinderMock = vi.mocked(pathfinding.BestFirstFinder)
const BreadthFirstFinderMock = vi.mocked(pathfinding.BreadthFirstFinder)
const DijkstraFinderMock = vi.mocked(pathfinding.DijkstraFinder)

describe('mapFinder', () => {
  const options: pathfinding.FinderOptions = {}
  const finder: pathfinding.Finder = {} as pathfinding.Finder

  it('should return A* finder', async () => {
    // biome-ignore lint/complexity/useArrowFunction: vitest
    AStarFinderMock.mockImplementation(function () {
      return finder as pathfinding.AStarFinder
    })
    expect(mapFinder('A_STAR', options)).toEqual(finder)
    expect(AStarFinderMock).toHaveBeenCalledWith(options)
  })

  it('should return best first finder', async () => {
    // biome-ignore lint/complexity/useArrowFunction: vitest
    AStarFinderMock.mockImplementation(function () {
      return finder as pathfinding.BestFirstFinder
    })
    expect(mapFinder('BEST_FIRST', options)).toEqual(finder)
    expect(BestFirstFinderMock).toHaveBeenCalledWith(options)
  })

  it('should return breadth first finder', async () => {
    // biome-ignore lint/complexity/useArrowFunction: vitest
    AStarFinderMock.mockImplementation(function () {
      return finder as pathfinding.BreadthFirstFinder
    })
    expect(mapFinder('BREADTH_FIRST', options)).toEqual(finder)
    expect(BreadthFirstFinderMock).toHaveBeenCalledWith(options)
  })

  it('should return dijkstra finder', async () => {
    // biome-ignore lint/complexity/useArrowFunction: vitest
    AStarFinderMock.mockImplementation(function () {
      return finder as pathfinding.DijkstraFinder
    })
    expect(mapFinder('DIJKSTRA', options)).toEqual(finder)
    expect(DijkstraFinderMock).toHaveBeenCalledWith(options)
  })
})
