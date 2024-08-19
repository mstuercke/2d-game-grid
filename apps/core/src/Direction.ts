/**
 * A straight direction
 */
export type StraightDirection = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'

/**
 * A diagonal direction
 */
export type DiagonalDirection = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT'

/**
 * An array of all straight directions
 */
export const STRAIGHT_DIRECTIONS = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'] satisfies StraightDirection[]

/**
 * An array of all diagonal directions
 */
export const DIAGONAL_DIRECTIONS = [
  'TOP_LEFT',
  'TOP_RIGHT',
  'BOTTOM_LEFT',
  'BOTTOM_RIGHT',
] satisfies DiagonalDirection[]

/**
 * A straight or diagonal direction
 */
export type Direction = StraightDirection | DiagonalDirection

/**
 * An array of all straight and diagonal directions
 */
export const ALL_DIRECTIONS: Direction[] = [...STRAIGHT_DIRECTIONS, ...DIAGONAL_DIRECTIONS]

export const getOppositeDirection = <T extends Direction>(direction: T): T => {
  return {
    TOP: 'BOTTOM',
    BOTTOM: 'TOP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
    TOP_LEFT: 'BOTTOM_RIGHT',
    BOTTOM_RIGHT: 'TOP_LEFT',
    TOP_RIGHT: 'BOTTOM_LEFT',
    BOTTOM_LEFT: 'TOP_RIGHT',
  }[direction] as T
}
