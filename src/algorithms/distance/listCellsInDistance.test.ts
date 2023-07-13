import {Cell} from '../../Cell';
import {Grid} from '../../Grid';
import {preInitializedGridOptionsFixture} from '../../Grid.fixture';
import {listCellsInDistance} from './listCellsInDistance';

describe('listCellsInDistance', () => {
  it.each`
    algorithm      | maxDistance | expectedCellIds
    ${'MANHATTAN'} | ${3}        | ${['0-2', '2-2', '1-1', '1-3', '0-1', '2-3', '1-2', '0-0']}
    ${'MANHATTAN'} | ${2}        | ${['0-2', '1-3', '0-1', '2-3', '1-2']}
    ${'EUCLIDEAN'} | ${3}        | ${['0-2', '2-2', '1-1', '1-3', '0-1', '2-1', '2-3', '1-2', '0-0']}
    ${'EUCLIDEAN'} | ${2}        | ${['0-2', '1-3', '0-1', '2-3', '1-2']}
  `('should list cells in max distance of $maxDistance with $algorithm algorithm',
      async ({algorithm, maxDistance, expectedCellIds}) => {
        const grid = new Grid<string>(preInitializedGridOptionsFixture);
        const cell = new Cell<string>(grid, {row: 0, col: 3}, 'foo');

        const cellsInDistance = listCellsInDistance(cell, maxDistance, algorithm);
        expect(cellsInDistance.map(cell => cell.value)).toEqual(expectedCellIds);
      });

});
