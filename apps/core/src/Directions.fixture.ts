import type {Directions} from './Directions.js'
import type {TestCornerDirection, TestEdgeDirection, TestNeighborDirection} from './Direction.fixture.js'

export type TestDirections = Directions<TestNeighborDirection, TestEdgeDirection, TestCornerDirection>
