import {DiagonalMovement as PathfindingDiagonalMovement} from 'pathfinding'
import {mapPathfindingDiagonalMovement} from './mapPathfindingDiagonalMovement.js'

describe('mapPathfindingDiagonalMovement', () => {
  it.each`
    input                        | output
    ${'ALWAYS'}                  | ${PathfindingDiagonalMovement.Always}
    ${'NEVER'}                   | ${PathfindingDiagonalMovement.Never}
    ${'IF_AT_MOST_ONE_OBSTACLE'} | ${PathfindingDiagonalMovement.IfAtMostOneObstacle}
    ${'ONLY_WHEN_NO_OBSTACLES'}  | ${PathfindingDiagonalMovement.OnlyWhenNoObstacles}
  `('should map $input to $output', async ({input, output}) => {
    expect(mapPathfindingDiagonalMovement(input)).toEqual(output)
  })
})
