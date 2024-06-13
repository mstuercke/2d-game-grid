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
