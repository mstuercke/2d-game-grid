/**
 * A neighbor direction for a hexagon with a flat top
 */
export type FlatTopHexagonNeighborDirection =
  | 'TOP_LEFT'
  | 'TOP'
  | 'TOP_RIGHT'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM'
  | 'BOTTOM_LEFT'

/**
 * An array of all possible neighbor directions for hexagon with a flat top
 */
export const FLAT_TOP_HEXAGON_NEIGHBOR_DIRECTIONS: FlatTopHexagonNeighborDirection[] = [
  'TOP_LEFT',
  'TOP',
  'TOP_RIGHT',
  'BOTTOM_RIGHT',
  'BOTTOM',
  'BOTTOM_LEFT',
]

/**
 * An edge direction for a hexagon with a flat top
 */
export type FlatTopHexagonEdgeDirection = FlatTopHexagonNeighborDirection

/**
 * An array of all possible edge directions for hexagon with a flat top
 */
export const FLAT_TOP_HEXAGON_EDGE_DIRECTIONS: FlatTopHexagonEdgeDirection[] = FLAT_TOP_HEXAGON_NEIGHBOR_DIRECTIONS

/**
 * A corner direction for a hexagon with a flat top
 */
export type FlatTopHexagonCornerDirection = 'TOP_LEFT' | 'TOP_RIGHT' | 'RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT' | 'LEFT'

/**
 * An array of all possible corner directions for hexagon with a flat top
 */
export const FLAT_TOP_HEXAGON_CORNER_DIRECTIONS: FlatTopHexagonCornerDirection[] = [
  'TOP_LEFT',
  'TOP_RIGHT',
  'RIGHT',
  'BOTTOM_RIGHT',
  'BOTTOM_LEFT',
  'LEFT',
]
