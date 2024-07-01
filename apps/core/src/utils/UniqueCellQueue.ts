import type {Cell} from '../Cell'
import {QueueIsEmptyError} from '../errors'
import type {Directions} from '../Directions'

/**
 * This queue will return each cell only once
 */
export class UniqueCellQueue<TValue, TDirections extends Directions, TCell extends Cell<TValue, TDirections>> {
  private queue: TCell[] = []
  private cellIds: string[] = []

  /**
   * Adds a cell to the queue. If the given cell was in the queue already, it will not be added to the queue
   * @param cell The cell that should be added to the queue
   */
  add(cell: TCell): void {
    if (this.cellIds.includes(cell.id)) return

    this.ignore(cell)
    this.queue.push(cell)
  }

  /**
   * Adds an array of cells to the queue. If a given cell was in the queue already, it will not be added to the queue
   * @param cells The cells that should be added to the queue
   */
  addAll(cells: TCell[]): void {
    for (const cell of cells) {
      this.add(cell)
    }
  }

  /**
   * @param cell The cell that should never be added to the queue
   */
  ignore(cell: TCell): void {
    this.cellIds.push(cell.id)
  }

  /**
   * @returns true when the queue is not empty
   */
  hasNext(): boolean {
    return this.queue.length > 0
  }

  /**
   * @returns The next cell in the queue
   * @throws {QueueIsEmptyError} when the queue has no more cells
   */
  getNext(): TCell {
    const cell = this.queue.pop()
    if (!cell) throw new QueueIsEmptyError()
    return cell
  }
}
