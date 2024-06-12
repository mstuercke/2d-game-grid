import {manhattanDistance} from './manhattanDistance'

describe('manhattanDistance', () => {
  it('should calculate vertical distance', async () => {
    const distance = manhattanDistance({row: 1, col: 1}, {row: 1, col: 3})
    expect(distance).toEqual(2)
  })

  it('should calculate horizontal distance', async () => {
    const distance = manhattanDistance({row: 1, col: 1}, {row: 3, col: 1})
    expect(distance).toEqual(2)
  })

  it('should calculate diagonal distance', async () => {
    const distance = manhattanDistance({row: 1, col: 1}, {row: 2, col: 3})
    expect(distance).toEqual(3)
  })
})
