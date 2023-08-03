/**
 * An error that is thrown when the actual grid width is not the same as the expected grid width
 */
export class UnequalGridWidthError extends Error {
  /**
   @param expectedWidth The expected width of the grid
   @param actualWidth The actual width of the grid
   */
  constructor(expectedWidth: number, actualWidth: number) {
    super(`The grid must have exactly ${expectedWidth} columns. Given grid width: ${actualWidth}`);
  }
}
