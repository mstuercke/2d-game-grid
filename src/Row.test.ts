import {Row} from './Row';
import {Grid} from './Grid';
import {preInitializedGridOptionsFixture} from './Grid.fixture';

describe('Row', () => {
  let row: Row<string>;

  beforeEach(() => {
    jest.clearAllMocks();
    const grid = new Grid<string>(preInitializedGridOptionsFixture);
    row = new Row(grid, 2);
  });

  it('should have correct id', async () => {
    expect(row.id).toEqual('row|2');
  });

  it('should list cells', async () => {
    const cells = row.cells;
    const cellValues = cells.map(cell => cell.value);
    expect(cellValues).toEqual(['2-0', '2-1', '2-2', '2-3']);
  });

  it('should get cell', async () => {
    const cell = row.getCell(1);
    expect(cell.value).toEqual('2-1');
  });

  describe('event: OnCellValueChanged', function () {
    it('should register callback', async () => {
      const onCellValueChangedSpy = jest.spyOn(row['eventDispatcher'], 'onCellValueChanged');
      const callback = jest.fn();
      row.onCellValueChanged(callback);
      expect(onCellValueChangedSpy).toHaveBeenCalledWith(callback);
    });

    it('should unregister callback', async () => {
      const onCellValueChangedSpy = jest.spyOn(row['eventDispatcher'], 'onCellValueChanged');
      const unregisterFn = jest.fn();
      onCellValueChangedSpy.mockReturnValueOnce(unregisterFn);

      const unregister = row.onCellValueChanged(jest.fn());
      unregister();

      expect(unregisterFn).toHaveBeenCalled();
    });

    it('should forward events of all cells', async () => {
      const dispatchCellValueChangedEventSpy = jest.spyOn(row['eventDispatcher'], 'dispatchCellValueChangedEvent');
      for (let cell of row.cells) {
        const previousValue = cell.value;
        cell.value = `${previousValue} (changed)`;
        expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledWith({cell, previousValue});
      }
      expect(dispatchCellValueChangedEventSpy).toHaveBeenCalledTimes(row.cells.length);
    });
  });
});
