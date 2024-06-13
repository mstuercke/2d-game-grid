/**
 * A direction for a hexagon with a flat top
 */
export type FlatTopDirection = 'TOP_LEFT' | 'TOP' | 'TOP_RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM' | 'BOTTOM_LEFT'

/**
 * An array of all possible directions for hexagon with a flat top
 */
export const FLAT_TOP_DIRECTIONS: FlatTopDirection[] = [
  'TOP_LEFT',
  'TOP',
  'TOP_RIGHT',
  'BOTTOM_RIGHT',
  'BOTTOM',
  'BOTTOM_LEFT',
]

/**
 * A direction for a hexagon with a pointy top
 */
export type PointyTopDirection = 'TOP_LEFT' | 'TOP_RIGHT' | 'RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT' | 'LEFT'

/**
 * An array of all possible directions for hexagon with a pointy top
 */
export const POINTY_TOP_DIRECTIONS: PointyTopDirection[] = [
  'TOP_LEFT',
  'TOP_RIGHT',
  'RIGHT',
  'BOTTOM_RIGHT',
  'BOTTOM_LEFT',
  'LEFT',
]

export type HexagonDirection = FlatTopDirection | PointyTopDirection
