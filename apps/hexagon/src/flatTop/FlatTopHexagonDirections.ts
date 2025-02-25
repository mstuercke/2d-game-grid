import type {Directions} from '@2d-game-grid/core'
import type {
  FlatTopHexagonCornerDirection,
  FlatTopHexagonEdgeDirection,
  FlatTopHexagonNeighborDirection,
} from './FlatTopHexagonDirection.js'

export type FlatTopHexagonDirections = Directions<
  FlatTopHexagonNeighborDirection,
  FlatTopHexagonEdgeDirection,
  FlatTopHexagonCornerDirection
>
