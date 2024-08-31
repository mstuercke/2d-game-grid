import type {Coordinate} from '@2d-game-grid/core'
import {getDistance} from './getDistance'
import {manhattanDistance} from './manhattanDistance'
import {euclideanDistance} from './euclideanDistance'

vi.mock('./euclideanDistance')
const euclideanDistanceMock = vi.mocked(euclideanDistance)

vi.mock('./manhattanDistance')
const manhattanDistanceMock = vi.mocked(manhattanDistance)

describe('getDistance', () => {
  const start: Coordinate = {row: 1, col: 2}
  const end: Coordinate = {row: 2, col: 2}

  it('should use euclidean distance', async () => {
    euclideanDistanceMock.mockReturnValueOnce(1)

    const distance = getDistance(start, end, 'EUCLIDEAN')

    expect(euclideanDistanceMock).toHaveBeenCalledWith(start, end)
    expect(distance).toEqual(1)
  })

  it('should use manhattan distance', async () => {
    manhattanDistanceMock.mockReturnValueOnce(2)

    const distance = getDistance(start, end, 'MANHATTAN')

    expect(manhattanDistanceMock).toHaveBeenCalledWith(start, end)
    expect(distance).toEqual(2)
  })
})
