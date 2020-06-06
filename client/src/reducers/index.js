import { combineReducers } from "redux"
import alert from "./alert"
import auth from "./auth"
import hall from "./hall"
import booking from "./booking"
export default combineReducers({
  alert,
  auth,
  hall,
  booking,
})
