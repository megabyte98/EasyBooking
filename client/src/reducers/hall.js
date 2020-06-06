import { GET_HALLS, HALL_ERROR, CLEAR_HALL, GET_HALL } from "../actions/types"

const initialState = {
  hall: null,
  halls: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_HALL:
      return {
        ...state,
        hall: payload,
        loading: false,
      }
    case GET_HALLS:
      return {
        ...state,
        halls: payload,
        loading: false,
      }
    case HALL_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case CLEAR_HALL:
      return {
        ...state,
        hall: null,
        halls: null,
        loading: false,
      }
    default:
      return state
  }
}
