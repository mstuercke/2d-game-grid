import type {Grid} from '../Grid.js'
import {preInitializedGridOptionsFixture, TestGrid} from '../Grid.fixture.js'
import {UniqueCellQueue} from './UniqueCellQueue.js'
import type {TestDirections} from '../Directions.fixture.js'
import type {TestCell} from '../Cell.fixture.js'

describe('UniqueCellQueue', () => {
  let grid: Grid<string, TestDirections, TestCell>
  let queue: UniqueCellQueue<string, TestDirections, TestCell>

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
