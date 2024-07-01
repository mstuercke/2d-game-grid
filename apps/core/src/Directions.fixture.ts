import type {Directions} from './Directions'
import type {TestCornerDirection, TestEdgeDirection, TestNeighborDirection} from './Direction.fixture'

export type TestDirections = Directions<TestNeighborDirection, TestEdgeDirection, TestCornerDirection>
