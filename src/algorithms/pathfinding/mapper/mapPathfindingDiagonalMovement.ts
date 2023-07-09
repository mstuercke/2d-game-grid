import {DiagonalMovement as PathfindingDiagonalMovement} from 'pathfinding';
import {DiagonalMovement} from '../PathfindingOptions';

export function mapPathfindingDiagonalMovement(diagonalMovement: DiagonalMovement): PathfindingDiagonalMovement {
  return {
    'ALWAYS': PathfindingDiagonalMovement.Always,
    'NEVER': PathfindingDiagonalMovement.Never,
    'IF_AT_MOST_ONE_OBSTACLE': PathfindingDiagonalMovement.IfAtMostOneObstacle,
    'ONLY_WHEN_NO_OBSTACLES': PathfindingDiagonalMovement.OnlyWhenNoObstacles,
  }[diagonalMovement];
}
