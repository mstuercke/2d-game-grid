import pathfinding from 'pathfinding'
import {mapPathfindingDiagonalMovement} from './mapPathfindingDiagonalMovement.js'

describe('mapPathfindingDiagonalMovement', () => {
  it.each`
    input                        | output
    ${'ALWAYS'}                  | ${pathfinding.DiagonalMovement.Always}
    ${'NEVER'}                   | ${pathfinding.DiagonalMovement.Never}
    ${'IF_AT_MOST_ONE_OBSTACLE'} | ${pathfinding.DiagonalMovement.IfAtMostOneObstacle}
    ${'ONLY_WHEN_NO_OBSTACLES'}  | ${pathfinding.DiagonalMovement.OnlyWhenNoObstacles}
  `('should map $input to $output', async ({input, output}) => {
    expect(mapPathfindingDiagonalMovement(input)).toEqual(output)
  })
})
