# 2D Game Grid
![npm version](https://badge.fury.io/js/2d-game-grid.svg)
![pipeline status](https://gitlab.com/mstuercke/2d-game-grid/badges/master/pipeline.svg)
![coverage](https://gitlab.com/mstuercke/2d-game-grid/badges/master/coverage.svg?job=test)

A simple grid made for games.

Features:
- Cell Neighbours
- Distance calculation
- Pathfinding

You can find a live demo [here](https://3ms9ky.csb.app/).

## Usage
### Installation
Install [2d-game-grid](https://www.npmjs.com/package/2d-game-grid) to your project with either `npm install 2d-game-grid` or `yarn add 2d-game-grid`

### Create a grid
Both examples will create the exact same grid
#### Use pregenerated cells
```ts
import {Grid} from '2d-game-grid';

new Grid<string>([
  ['0-0', '0-1', '0-2'],
  ['1-0', '1-1', '1-2'],
  ['2-0', '2-1', '2-2'],
])
```

#### Generate cells on initialization
```ts
import {Grid} from '2d-game-grid';

new Grid<string>({
  width: 3,
  height: 3,
  initializeCellValue: ({row, col}) => `${row}-${col}`,
});
```

### Get cell
```ts
const cell = grid.getCell({row: 1, col: 2});
console.log(cell.value) // '1-2'
```

### Get cells of row
```ts
const row = grid.getRow(1);
console.log(row.cells.map(cell => cell.value)) // ['1-0', '1-1', '1-2']
```

### Get cells of column
```ts
const column = grid.getColumn(1);
console.log(column.cells.map(cell => cell.value)) // ['0-1', '1-1', '2-1']
```

### Get neighbours of cell
```ts
const cell = grid.getCell({row: 1, col: 2});
const leftNeighbour = cell.neighbours.get('LEFT');
console.log(leftNeighbour.value); // '1-1'
```


### Get distance between cells
```ts
const cell = grid.getCell({row: 1, col: 2});
const distance = cell.getDistance({row: 1, col: 0});
console.log(distance); // 2
```

#### Algorithms
- [Manhattan](https://en.wikipedia.org/wiki/Taxicab_geometry)
- [Euclidean](https://en.wikipedia.org/wiki/Euclidean_distance)

### Get the shortest path between cells
The pathfinding uses the [pathfinding](https://www.npmjs.com/package/pathfinding) package.  

```ts
const cell = grid.getCell({row: 1, col: 2});
const path = cell.getPath({row: 0, col: 0});
console.log(path.map(cell => cell.value)); // ['1-2', '0-1', '0-0']
```
Hint: The returned path will always include the start and the end.

#### Algorithms
- [A* (A Star)](https://en.wikipedia.org/wiki/A*_search_algorithm)
- [Best First](https://en.wikipedia.org/wiki/Best-first_search)
- [Breadth First](https://en.wikipedia.org/wiki/Breadth-first_search)
- [Dijkstra](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

#### Diagonal movement
You can decide which diagonal movements should be allowed: 
- Always  
  ![Always](https://gitlab.com/mstuercke/2d-game-grid/-/raw/master/images/always.jpg)
- Never  
  ![Never](https://gitlab.com/mstuercke/2d-game-grid/-/raw/master/images/never.jpg)
- If at most one obstacle  
  ![If at most one obstacle](https://gitlab.com/mstuercke/2d-game-grid/-/raw/master/images/if-at-most-one-obstacle.jpg)
- Only when no obstacles  
  ![Only when no obstacles](https://gitlab.com/mstuercke/2d-game-grid/-/raw/master/images/only-when-no-obstacles.jpg)

#### Heuristic
You can either choose between the following heuristic algorithms:
- [Manhattan](https://en.wikipedia.org/wiki/Taxicab_geometry)
- [Chebyshev](https://en.wikipedia.org/wiki/Chebyshev_distance)
- [Euclidean](https://en.wikipedia.org/wiki/Euclidean_distance)
- Octile

Or pass your own heuristic function:
```ts
cell.getDistance({row: 1, col: 0}, {
  heuristic: (cell) => {/* your implementation */}
});
```

## Collaboration
Feel free to create issues or merge requests

### Publish package
Modify the version in `package.json`. When running the pipeline on `master` a new package will be deployed with that version. 


