import type {DiagonalDirection, StraightDirection} from './Direction.js'

export type TestNeighborDirection = StraightDirection | DiagonalDirection
export type TestEdgeDirection = StraightDirection
export type TestCornerDirection = DiagonalDirection
