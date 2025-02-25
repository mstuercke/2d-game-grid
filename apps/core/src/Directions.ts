import type {Direction} from './Direction.js'

export type Directions<
  TNeighborDirection extends Direction = Direction,
  TEdgeDirection extends TNeighborDirection = TNeighborDirection,
  TCornerDirection extends Direction = Direction,
> = {
  Neighbor: TNeighborDirection
  Edge: TEdgeDirection
  Corner: TCornerDirection
}
