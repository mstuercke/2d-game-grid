import {Coordinate} from '../../Coordinate';
import {DistanceAlgorithm} from './DistanceAlgorithm';
import {euclideanDistance} from './euclideanDistance';
import {manhattanDistance} from './manhattanDistance';

export function getDistance(start: Coordinate, end: Coordinate, algorithm: DistanceAlgorithm): number {
  return {
    EUCLIDEAN: euclideanDistance,
    MANHATTAN: manhattanDistance,
  }[algorithm](start, end);
}
