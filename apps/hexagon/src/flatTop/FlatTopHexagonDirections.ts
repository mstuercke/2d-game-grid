import type {Directions} from '@2d-game-grid/core'
import type {FlatTopHexagonCornerDirection, FlatTopHexagonNeighborDirection} from './FlatTopHexagonNeighborDirection'

export type FlatTopHexagonDirections = Directions<
  FlatTopHexagonNeighborDirection,
  FlatTopHexagonNeighborDirection,
  FlatTopHexagonCornerDirection
>
