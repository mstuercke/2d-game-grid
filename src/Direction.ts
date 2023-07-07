export type StraightDirection = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'
export type DiagonalDirection = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT'
export type Direction = StraightDirection | DiagonalDirection

export const STRAIGHT_DIRECTIONS: StraightDirection[] = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];
export const DIAGONAL_DIRECTIONS: DiagonalDirection[] = ['TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT'];
export const ALL_DIRECTIONS: Direction[] = [...STRAIGHT_DIRECTIONS, ...DIAGONAL_DIRECTIONS];
