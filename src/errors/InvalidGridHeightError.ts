/**
 * An error that is thrown when the actual grid height is not the same as the expected grid height
 */
export class UnequalGridHeightError extends Error {
  /**
   @param expectedHeight The expected height of the grid
   @param actualHeight The actual height of the grid
   */
  constructor(expectedHeight: number, actualHeight: number) {
    super(`The grid must have exactly ${expectedHeight} columns. Given grid height: ${actualHeight}`);
  }
}
