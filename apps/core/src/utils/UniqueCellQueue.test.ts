import type {Grid} from '../Grid'
import {preInitializedGridOptionsFixture, TestGrid} from '../Grid.fixture'
import {UniqueCellQueue} from './UniqueCellQueue'
import type {Cell} from '../Cell'
import type {TestCornerDirection, TestEdgeDirection, TestNeighborDirection} from '../Direction.fixture'

describe('UniqueCellQueue', () => {
  let grid: Grid<string, Cell<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>
  let queue: UniqueCellQueue<string, Cell<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>

  beforeEach(() => {
    grid = new TestGrid(preInitializedGridOptionsFixture)
    queue = new UniqueCellQueue()
  })

  it('should add and return cell', async () => {
    const cell = grid.getCell({row: 1, col: 2})
    expect(queue.hasNext()).toEqual(false)
    queue.add(cell)
    expect(queue.hasNext()).toEqual(true)
    expect(queue.getNext()).toEqual(cell)
    expect(queue.hasNext()).toEqual(false)
  })

  it('should return true when cells are in queue', async () => {
    const cell = grid.getCell({row: 1, col: 2})
    expect(queue.hasNext()).toEqual(false)
    queue.add(cell)
    expect(queue.hasNext()).toEqual(true)
    queue.getNext()
    expect(queue.hasNext()).toEqual(false)
  })

  it('should throw error, when the queue is empty', async () => {
    expect(() => queue.getNext()).toThrowError()
  })

  it('should return a cell only once', async () => {
    const cell = grid.getCell({row: 1, col: 2})
    queue.add(cell)
    queue.add(cell)
    queue.getNext()
    queue.add(cell)
    expect(queue.hasNext()).toEqual(false)
  })

  describe('should return last added cell first', () => {
    it('add()', async () => {
      const cell1 = grid.getCell({row: 1, col: 2})
      const cell2 = grid.getCell({row: 1, col: 0})
      queue.add(cell1)
      queue.add(cell2)
      expect(queue.getNext()).toEqual(cell2)
      expect(queue.getNext()).toEqual(cell1)
    })

    it('addAll()', async () => {
      const cell1 = grid.getCell({row: 1, col: 2})
      const cell2 = grid.getCell({row: 1, col: 0})
      queue.addAll([cell1, cell2])
      expect(queue.getNext()).toEqual(cell2)
      expect(queue.getNext()).toEqual(cell1)
    })
  })

  it('should not add cell if ignored', async () => {
    const cell = grid.getCell({row: 1, col: 2})
    queue.ignore(cell)
    expect(queue.hasNext()).toEqual(false)
  })
})
