export class InvalidGridSizeError extends Error {
  constructor(width: number, height: number) {
    super(`There must be at least 1 column and 1 row in the grid. Given grid size: [width: ${width}, height: ${height}]`);
  }
}
