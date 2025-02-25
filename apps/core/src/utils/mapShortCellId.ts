import type {Cell} from '../Cell.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapShortCellId = (cell: Cell<any, any>): string => {
  return `${cell.row}-${cell.col}`
}
