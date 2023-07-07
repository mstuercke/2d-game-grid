import {Direction} from './Direction';

export interface Coordinate {
  col: number;
  row: number;
}
export interface NeighbourCoordinate extends Coordinate {
  direction: Direction;
}
