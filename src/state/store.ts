import { nanoid } from "nanoid"


export interface Shape {
  id: string
  x0: number
  y0: number
  x1: number
  y1: number
}

export interface Store {
  shapes: Shape[]
}


interface AddShapeAction {
  type: 'ADD_SHAPE'
}

interface DeleteShapeAction {
  type: 'DELETE_SHAPE'
  payload: {
    id: string
  }
}

interface MoveShapeAction {
  type: 'MOVE_SHAPE'
  payload: {
    id: string
    x0: number
    y0: number
    x1: number
    y1: number
  }
}

export type Action = AddShapeAction | DeleteShapeAction | MoveShapeAction

const NEW_SHAPE_OFFSET = 10


export const storeReducer = (state: Store, action: Action): Store => {
  switch(action.type) {
    case 'ADD_SHAPE':
    // copy the position of the last shape if there is one, otherwise
    // start at 0, 0 with a width and height of 100
      return {
        ...state,
        shapes: [
          ...state.shapes,
          {
            id: nanoid(),
            x0: state.shapes.length ? state.shapes[state.shapes.length - 1].x0 + NEW_SHAPE_OFFSET : 0,
            y0: state.shapes.length ? state.shapes[state.shapes.length - 1].y0 + NEW_SHAPE_OFFSET : 0,
            x1: state.shapes.length ? state.shapes[state.shapes.length - 1].x1 + NEW_SHAPE_OFFSET : 100,
            y1: state.shapes.length ? state.shapes[state.shapes.length - 1].y1 + NEW_SHAPE_OFFSET : 100
          }
        ]

      }
    case 'DELETE_SHAPE':
      return {
        ...state,
        shapes: state.shapes.filter(shape => shape.id !== action.payload.id)
      }
    case 'MOVE_SHAPE':
      return {
        ...state,
        shapes: state.shapes.map(shape => {
          if(shape.id === action.payload.id) {
            return {
              ...shape,
              x0: action.payload.x0,
              y0: action.payload.y0,
              x1: action.payload.x1,
              y1: action.payload.y1
            }
          }
          return shape
        })
      }
    default:
      return state
  }
}
