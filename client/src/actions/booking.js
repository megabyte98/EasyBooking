import axios from "axios"
import {
  GET_MY_BOOKINGS,
  BOOKING_ERROR,
  BOOKING_FAILURE,
  BOOKING_SUCCESS,
  DELETE_BOOKING,
} from "./types"
import { setAlert } from "./alert"

// to get all bookings of user
export const getAllMyBookings = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/booking/mybookings")
    dispatch({
      type: GET_MY_BOOKINGS,
      payload: res.data,
    })
  } catch (err) {
    console.error(err.response.data)
    dispatch({
      type: BOOKING_ERROR,
    })
  }
}

// to create a booking
export const createBooking = (formData, hall_id, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    const res = await axios.post(
      `http://localhost:5000/api/booking/${hall_id}`,
      formData,
      config
    )
    dispatch({
      type: BOOKING_SUCCESS,
      payload: res.data,
    })
    dispatch(setAlert("Booking has Been Confirmed ", "success"))
    history.push("/myBookings")
  } catch (err) {
    console.error(err.response.data)
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")))
    }
    dispatch({
      type: BOOKING_FAILURE,
    })
  }
}

// to delete a booking
export const deleteBooking = (hall_id, booking_id, history) => async (
  dispatch
) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/booking/${hall_id}/${booking_id}`
    )
    dispatch({
      type: DELETE_BOOKING,
      payload: res.data,
    })
    dispatch(setAlert("Booking Deleted Successfully", "success"))
    history.push("/dashboard")
  } catch (err) {
    console.error(err.response.data)
    dispatch({
      type: BOOKING_ERROR,
    })
  }
}
