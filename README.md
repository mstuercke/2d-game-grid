![Always](https://gitlab.com/mstuercke/2d-game-grid/-/raw/master/images/header.jpg)

# 2D Game Grid
A simple grid made for games with built-in features like:
- pathfinding
- getting cell neighbors
- calculate distance between cells
- list cells in distance

Missing a feature? [Create an issue](https://gitlab.com/mstuercke/2d-game-grid/-/issues)!

## Examples & Demos
- [example code](https://codesandbox.io/s/y3xt8s)  
  a basic implementation
- [interactive demo](https://3ms9ky.csb.app/)  
  a customizable playground to visualize all the features

## Usage
### Installation
Install [2d-game-grid](https://www.npmjs.com/package/2d-game-grid) to your project with one of the following commands: 
#### npm
```
npm install 2d-game-grid
``` 
#### yarn
```
yarn add 2d-game-grid
```

### Create a grid
Both examples will create the exact same grid
#### Use pre-generated cells
```ts
import {Grid} from '2d-game-grid';

const grid = new Grid({
  grid: [
    ['0-0', '0-1', '0-2', '0-3'],
    ['1-0', '1-1', '1-2', '1-3'],
    ['2-0', '2-1', '2-2', '2-3']
  ]
})
```

#### Generate cells on initialization
```ts
import {Grid} from '2d-game-grid';

const grid = new Grid({
  width: 4,
  height: 3,
  initializeCellValue: ({row, col}) => `${row}-${col}`,
});
```

### Get cell
```ts
const cell = grid.getCell({row: 1, col: 2});
console.log(cell.value) // '1-2'
```

### Get cells of a row
```ts
const row = grid.getRow(1);
console.log(row.cells.map(cell => cell.value)) // ['1-0', '1-1', '1-2', '1-3']
```

### Get cells of a column
```ts
const column = grid.getColumn(1);
console.log(column.cells.map(cell => cell.value)) // ['0-1', '1-1', '2-1']
```

### Get neighbors of a cell
```ts
const cell = grid.getCell({row: 1, col: 2});
const leftNeighbor = cell.neighbors.get('LEFT');
console.log(leftNeighbor.value); // '1-1'
```

### Get the distance between cells
```ts
const cell = grid.getCell({row: 1, col: 2});
const distance = cell.getDistance({row: 1, col: 0});
console.log(distance); // 2
```

### List all cells in distance
```ts
const cell = grid.getCell({row: 0, col: 3});
const cells = cell.listCellsInDistance(2);
console.log(cells); // ['0-2', '1-3', '0-1', '2-3', '1-2']
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
cell.getPath({row: 1, col: 0}, {
  heuristic: (cell) => {/* your implementation */}
});
```

## Collaboration
Feel free to create issues or merge requests

### Release package
Modify the version in `package.json`. When running the pipeline on `master` a new package will be deployed with that version. 


