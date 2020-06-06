import {
  GET_MY_BOOKINGS,
  BOOKING_ERROR,
  BOOKING_FAILURE,
  BOOKING_SUCCESS,
  DELETE_BOOKING,
} from "../actions/types"

const initialState = {
  booking: null,
  bookings: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case BOOKING_SUCCESS:
      return {
        ...state,
        bookings: [payload, ...state.bookings],
        loading: false,
      }
    case GET_MY_BOOKINGS:
      return { ...state, bookings: payload, loading: false }
    case BOOKING_ERROR:
    case BOOKING_FAILURE:
    case DELETE_BOOKING:
      return {
        ...state,
        booking: null,
        bookings: [],
        loading: false,
      }
    default:
      return state
  }
}
