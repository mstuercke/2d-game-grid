/**
 * A straight direction
 */
export type StraightDirection = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

/**
 * A diagonal direction
 */
export type DiagonalDirection = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT';

/**
 * A straight or diagonal direction
 */
export type Direction = StraightDirection | DiagonalDirection;

/**
 * An array of all straight directions
 */
export const STRAIGHT_DIRECTIONS: StraightDirection[] = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];

/**
 * An array of all diagonal directions
 */
export const DIAGONAL_DIRECTIONS: DiagonalDirection[] = ['TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT'];

/**
 * An array of all straight and diagonal directions
 */
export const ALL_DIRECTIONS: Direction[] = [...STRAIGHT_DIRECTIONS, ...DIAGONAL_DIRECTIONS];
