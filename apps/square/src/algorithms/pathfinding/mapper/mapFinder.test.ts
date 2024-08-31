import {AStarFinder, BestFirstFinder, BreadthFirstFinder, DijkstraFinder, type Finder, type FinderOptions} from 'pathfinding'
import {mapFinder} from './mapFinder'

vi.mock('pathfinding', () => ({
  AStarFinder: vi.fn(),
  BestFirstFinder: vi.fn(),
  BreadthFirstFinder: vi.fn(),
  DijkstraFinder: vi.fn(),
}))
const AStarFinderMock = vi.mocked(AStarFinder)
const BestFirstFinderMock = vi.mocked(BestFirstFinder)
const BreadthFirstFinderMock = vi.mocked(BreadthFirstFinder)
const DijkstraFinderMock = vi.mocked(DijkstraFinder)

describe('mapFinder', () => {
  const options: FinderOptions = {}
  const finder: Finder = {} as Finder

  it('should return A* finder', async () => {
    AStarFinderMock.mockReturnValueOnce(finder as AStarFinder)
    expect(mapFinder('A_STAR', options)).toEqual(finder)
    expect(AStarFinderMock).toHaveBeenCalledWith(options)
  })

  it('should return best first finder', async () => {
    BestFirstFinderMock.mockReturnValueOnce(finder as BestFirstFinder)
    expect(mapFinder('BEST_FIRST', options)).toEqual(finder)
    expect(BestFirstFinderMock).toHaveBeenCalledWith(options)
  })

  it('should return breadth first finder', async () => {
    BreadthFirstFinderMock.mockReturnValueOnce(finder as BreadthFirstFinder)
    expect(mapFinder('BREADTH_FIRST', options)).toEqual(finder)
    expect(BreadthFirstFinderMock).toHaveBeenCalledWith(options)
  })

  it('should return dijkstra finder', async () => {
    DijkstraFinderMock.mockReturnValueOnce(finder as DijkstraFinder)
    expect(mapFinder('DIJKSTRA', options)).toEqual(finder)
    expect(DijkstraFinderMock).toHaveBeenCalledWith(options)
  })
})
