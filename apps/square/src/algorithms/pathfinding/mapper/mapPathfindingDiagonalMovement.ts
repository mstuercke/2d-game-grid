import * as pathfinding from 'pathfinding'
import type {DiagonalMovement} from '../PathfindingOptions.js'

/**
 * @param diagonalMovement The allowed diagonal movements
 * @returns The DiagonalMovement value of the pathfinding lib
 */
export function mapPathfindingDiagonalMovement(diagonalMovement: DiagonalMovement): pathfinding.DiagonalMovement {
  return {
    ALWAYS: pathfinding.DiagonalMovement.Always,
    NEVER: pathfinding.DiagonalMovement.Never,
    IF_AT_MOST_ONE_OBSTACLE: pathfinding.DiagonalMovement.IfAtMostOneObstacle,
    ONLY_WHEN_NO_OBSTACLES: pathfinding.DiagonalMovement.OnlyWhenNoObstacles,
  }[diagonalMovement]
}
