import {ALL_DIRECTIONS, getOppositeDirection} from './Direction.js'

describe('Direction', () => {
  it.each(ALL_DIRECTIONS)(`should get opposite direction for %s`, (direction) => {
    const oppositeDirection = getOppositeDirection(direction)

    expect(oppositeDirection).not.toEqual(direction)
    expect(getOppositeDirection(oppositeDirection)).toEqual(direction)
  })
})
