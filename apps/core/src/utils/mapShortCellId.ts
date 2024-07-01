import type {Cell} from '../Cell'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapShortCellId = (cell: Cell<any, any, any, any>): string => {
  return `${cell.row}-${cell.col}`
}
