import {Coordinate} from '../../Coordinate';
import {getDistance} from './getDistance';
import {manhattanDistance} from './manhattanDistance';
import {euclideanDistance} from './euclideanDistance';

jest.mock('./euclideanDistance');
const euclideanDistanceMock = jest.mocked(euclideanDistance);

jest.mock('./manhattanDistance');
const manhattanDistanceMock = jest.mocked(manhattanDistance);

describe('getDistance', () => {
  const start: Coordinate = {row: 1, col: 2};
  const end: Coordinate = {row: 2, col: 2};

  it('should use euclidean distance', async () => {
    euclideanDistanceMock.mockReturnValueOnce(1);

    const distance = getDistance(start, end, 'EUCLIDEAN');

    expect(euclideanDistanceMock).toHaveBeenCalledWith(start, end);
    expect(distance).toEqual(1);
  });

  it('should use manhattan distance', async () => {
    manhattanDistanceMock.mockReturnValueOnce(2);

    const distance = getDistance(start, end, 'MANHATTAN');

    expect(manhattanDistanceMock).toHaveBeenCalledWith(start, end);
    expect(distance).toEqual(2);
  });
});
