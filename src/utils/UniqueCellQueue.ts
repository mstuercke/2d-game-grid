import {Cell} from '../Cell';
import {QueueIsEmptyError} from '../errors';

/**
 * This queue will return each cell only once
 */
export class UniqueCellQueue<Value> {
  private queue: Cell<Value>[] = [];
  private cellIds: string[] = [];

  /**
   * Adds a cell to the queue. If the given cell was in the queue already, it will not be added to the queue
   * @param cell The cell that should be added to the queue
   */
  add(cell: Cell<Value>): void {
    if (this.cellIds.includes(cell.id)) return;

    this.ignore(cell);
    this.queue.push(cell);
  }

  /**
   * Adds an array of cells to the queue. If a given cell was in the queue already, it will not be added to the queue
   * @param cells The cells that should be added to the queue
   */
  addAll(cells: Cell<Value>[]): void {
    cells.forEach(cell => this.add(cell));
  }

  /**
   * @param cell The cell that should never be added to the queue
   */
  ignore(cell: Cell<Value>): void {
    this.cellIds.push(cell.id);
  }

  /**
   * @returns true when the queue is not empty
   */
  hasNext(): boolean {
    return this.queue.length > 0;
  }

  /**
   * @returns The next cell in the queue
   * @throws {QueueIsEmptyError} when the queue has no more cells
   */
  getNext(): Cell<Value> {
    const cell = this.queue.pop();
    if (!cell) throw new QueueIsEmptyError();
    return cell;
  }
}
