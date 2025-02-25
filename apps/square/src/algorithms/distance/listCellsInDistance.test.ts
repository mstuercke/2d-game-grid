import {SquareCell} from '../../SquareCell.js'
import {SquareGrid} from '../../SquareGrid.js'
import {preInitializedGridOptionsFixture} from '../../SquareGrid.fixture.js'
import {listCellsInDistance} from './listCellsInDistance.js'

describe('listCellsInDistance', () => {
  it.each`
    algorithm      | maxDistance | expectedCellIds
    ${'MANHATTAN'} | ${3}        | ${['1-2', '2-3', '0-1', '0-0', '1-1', '2-2', '0-2', '1-3']}
    ${'MANHATTAN'} | ${2}        | ${['1-2', '2-3', '0-1', '0-2', '1-3']}
    ${'EUCLIDEAN'} | ${3}        | ${['1-2', '2-3', '2-1', '0-1', '0-0', '1-1', '2-2', '0-2', '1-3']}
    ${'EUCLIDEAN'} | ${2}        | ${['1-2', '2-3', '0-1', '0-2', '1-3']}
  `('should list cells in max distance of $maxDistance with $algorithm algorithm', async ({algorithm, maxDistance, expectedCellIds}) => {
    const grid = new SquareGrid<string>(preInitializedGridOptionsFixture)
    const cell = new SquareCell<string>(grid, {row: 0, col: 3}, 'foo')

    const cellsInDistance = listCellsInDistance(cell, maxDistance, algorithm)
    expect(cellsInDistance.map((cell) => cell.value)).toEqual(expectedCellIds)
  })
})
