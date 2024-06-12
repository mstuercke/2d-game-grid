/**
 * An error that is thrown when the queue has no remaining cells
 */
export class QueueIsEmptyError extends Error {
  readonly type = QueueIsEmptyError.name

  /**
   * Creates a new instance
   */
  constructor() {
    super(`The queue has no remaining cells`)
  }
}
