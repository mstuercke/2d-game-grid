/**
 * An error that is thrown when the grid size is invalid
 */
export class InvalidGridSizeError extends Error {
  /**
   * @param width The actual width of the grid
   * @param height The actual height of the grid
   */
  constructor(width: number, height: number) {
    super(`There must be at least 1 column and 1 row in the grid. Given grid size: [width: ${width}, height: ${height}]`);
  }
}
