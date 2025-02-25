import {DiagonalMovement as PathfindingDiagonalMovement} from 'pathfinding'
import type {DiagonalMovement} from '../PathfindingOptions.js'

/**
 * @param diagonalMovement The allowed diagonal movements
 * @returns The DiagonalMovement value of the pathfinding lib
 */
export function mapPathfindingDiagonalMovement(diagonalMovement: DiagonalMovement): PathfindingDiagonalMovement {
  return {
    ALWAYS: PathfindingDiagonalMovement.Always,
    NEVER: PathfindingDiagonalMovement.Never,
    IF_AT_MOST_ONE_OBSTACLE: PathfindingDiagonalMovement.IfAtMostOneObstacle,
    ONLY_WHEN_NO_OBSTACLES: PathfindingDiagonalMovement.OnlyWhenNoObstacles,
  }[diagonalMovement]
}
