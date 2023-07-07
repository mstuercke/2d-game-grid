import {Neighbours} from './Neighbours';
import {Coordinate} from './Coordinate';
import {Row} from './Row';
import {Column} from './Column';
import {CellDoesNotExistInGridError} from './errors/CellDoesNotExistInGridError';
import {DistanceAlgorithm} from './algorithms/distance/DistanceAlgorithm';
import {getDistance} from './algorithms/distance/getDistance';
import {InvalidGridSizeError} from './errors/InvalidGridSizeError';

export interface InitializeGridOptions<Cell> {
  width: number,
  height: number,
  initializeCell: (coordinate: Coordinate) => Cell
}

export interface PreInitializedGridOptions<Cell> {
  rows: Cell[][];
}

export class Grid<Cell> {
  readonly width: number;
  readonly height: number;
  readonly cells: Cell[][];

  constructor(options: InitializeGridOptions<Cell> | PreInitializedGridOptions<Cell>) {
    if ('initializeCell' in options) {
      this.width = options.width;
      this.height = options.height;
      this.cells = this.initializeCells(this.width, this.height, options.initializeCell);
    }

    if ('rows' in options) {
      const rows = options.rows;
      this.height = rows.length;
      this.width = Math.max(0, ...rows.map(row => row.length));
      this.cells = this.initializeCells(this.width, this.height, ({row, col}) => rows[row][col]);
    }
  }

  private initializeCells(width: number, height: number, initializeCell: (coordinate: Coordinate) => Cell): Cell[][] {
    if (this.height === 0 || this.width === 0)
      throw new InvalidGridSizeError(width, height);

    const cells = new Array(height);
    for (let row = 0; row < height; row++) {
      cells[row] = new Array(width);
      for (let col = 0; col < width; col++) {
        cells[row][col] = initializeCell({row, col});
      }
    }
    return cells;
  }

  cellExists({row, col}: Coordinate): boolean {
    return col >= 0
        && row >= 0
        && row < this.height
        && col < this.width;
  }

  listCells(): Cell[] {
    return this.cells.flat();
  }

  getCell({row, col}: Coordinate): Cell {
    if (!this.cellExists({row, col}))
      throw new CellDoesNotExistInGridError(this, {row, col});

    return this.cells[row][col];
  }

  setCell({row, col}: Coordinate, value: Cell): void {
    if (!this.cellExists({row, col}))
      throw new CellDoesNotExistInGridError(this, {row, col});

    this.cells[row][col] = value;
  }

  getNeighbours(coordinate: Coordinate): Neighbours<Cell> {
    return new Neighbours(this, coordinate);
  }

  listRows(): Row<Cell>[] {
    const rows: Row<Cell>[] = [];
    for (let row = 0; row < this.height; row++) {
      rows.push(new Row<Cell>(this, row));
    }
    return rows;
  }

  listColumns(): Column<Cell>[] {
    const cols: Column<Cell>[] = [];
    for (let col = 0; col < this.width; col++) {
      cols.push(new Column<Cell>(this, col));
    }
    return cols;
  }

  getCellDistance(start: Coordinate, end: Coordinate, algorithm: DistanceAlgorithm = 'MANHATTAN'): number {
    return getDistance(start, end, algorithm);
  }

  clone(cloneValue: (value: Cell) => Cell = (value) => value): Grid<Cell> {
    return new Grid({
      width: this.width,
      height: this.height,
      initializeCell: ({row, col}) => cloneValue(this.cells[row][col]),
    });
  }
}
