import axios from "axios"
import { GET_HALLS, HALL_ERROR, CLEAR_HALL, GET_HALL } from "./types"

// to get all halls
export const getAllHalls = () => async (dispatch) => {
  dispatch({ type: CLEAR_HALL })
  try {
    const res = await axios.get("http://localhost:5000/api/hall/")
    console.log(res.data)
    dispatch({
      type: GET_HALLS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: HALL_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}

// to get a particular hall by id
export const getHallById = (Id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/hall/${Id}`)

    dispatch({
      type: GET_HALL,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: HALL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
