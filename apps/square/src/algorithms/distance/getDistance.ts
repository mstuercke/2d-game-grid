import type {Coordinate} from '@2d-game-grid/core'
import type {DistanceAlgorithm} from './DistanceAlgorithm.js'
import {euclideanDistance} from './euclideanDistance.js'
import {manhattanDistance} from './manhattanDistance.js'

/**
 * @param start The start coordinate
 * @param end The end coordinate
 * @param algorithm The algorithm that should be used for the distance calculation
 * @returns The distance between the given coordinates
 */
export function getDistance(start: Coordinate, end: Coordinate, algorithm: DistanceAlgorithm): number {
  return {
    EUCLIDEAN: euclideanDistance,
    MANHATTAN: manhattanDistance,
  }[algorithm](start, end)
}
