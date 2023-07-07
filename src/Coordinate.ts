import {Direction} from './Direction';

export interface Coordinate {
  col: number;
  row: number;
}
export interface NeighbourCoordinate extends Coordinate {
  source: Coordinate;
  direction: Direction;
}
