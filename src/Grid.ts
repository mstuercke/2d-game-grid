import {Direction, DIRECTIONS} from './Direction';
import {Neighbours} from './Neighbours';

export interface Coordinates {
  col: number;
  row: number;
}

export interface NeighbourCoordinates extends Coordinates {
  direction: Direction;
}

export class Grid<T> {
  protected readonly grid: T[][];

  constructor(public width: number, public height: number, initialValue: (coordinates: Coordinates) => T) {
    this.grid = new Array(height);
    for (let row = 0; row < height; row++) {
      this.grid[row] = new Array(width);
      for (let col = 0; col < width; col++) {
        this.grid[row][col] = initialValue({row, col});
      }
    }
  }

  listCells(): T[] {
    return this.grid.flat();
  }

  listRows(): T[][] {
    return this.grid;
  }

  getCell({row, col}: Coordinates): T | undefined {
    if (!this.isInGrid({row, col}))
      return undefined;

    return this.grid[row][col];
  }

  setCell({row, col}: Coordinates, value: T): void {
    if (!this.isInGrid({row, col}))
      return undefined;

    this.grid[row][col] = value;
  }

  neighbours= new Neighbours(this)

  isInGrid({row, col}: Coordinates): boolean {
    return col >= 0
        && row >= 0
        && row < this.height
        && col < this.width;
  }

  clone(cloneValue: (value: T) => T = (value) => value): Grid<T> {
    return new Grid(this.width, this.height, ({row, col}) => cloneValue(this.grid[row][col]));
  }
}
