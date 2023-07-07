import {Grid} from './Grid';

export const gridFixture = new Grid(3, 3, ({row, col}) => `${row}-${col}`);
