import {SquareGrid} from '../../SquareGrid.js'
import {preInitializedGridOptionsFixture} from '../../SquareGrid.fixture.js'
import type {SquareCell} from '../../SquareCell.js'
import {listReachableCells} from './listReachableCells.js'
import type {PathfindingOptions} from './PathfindingOptions.js'

describe('listReachableCells', () => {
  let grid: SquareGrid<string>

  beforeEach(() => {
    grid = new SquareGrid<string>(preInitializedGridOptionsFixture)
  })

  it.each`
    maxPathSteps | reachableCellIds
    ${0}         | ${[]}
    ${1}         | ${[]}
    ${2}         | ${['0-1', '1-0']}
    ${3}         | ${['1-1', '2-0', '0-2', '0-1', '1-0']}
  `(`should list correct cells within $maxPathSteps path steps`, async ({maxPathSteps, reachableCellIds}) => {
    const cell = grid.getCell({row: 0, col: 0})
    const options: PathfindingOptions<string> = {
      diagonalMovement: 'NEVER',
    }

    expect(toValues(listReachableCells(cell, maxPathSteps, options))).toEqual(reachableCellIds)
  })

  it.each`
    wallCellIds       | reachableCellIds
    ${[]}             | ${['1-1', '2-0', '0-2', '0-1', '1-0']}
    ${['0-1']}        | ${['1-1', '2-0', '1-0']}
    ${['0-1', '1-0']} | ${[]}
  `(`should list correct cells with walls at: $wallCellIds`, async ({wallCellIds, reachableCellIds}) => {
    const cell = grid.getCell({row: 0, col: 0})
    const maxPathSteps = 3
    const options: PathfindingOptions<string> = {
      diagonalMovement: 'NEVER',
      isWalkable: (cell) => !wallCellIds.includes(cell.value),
    }

    expect(toValues(listReachableCells(cell, maxPathSteps, options))).toEqual(reachableCellIds)
  })
})

function toValues(cells: SquareCell<string>[]): string[] {
  return cells.map((cell) => cell.value)
}
