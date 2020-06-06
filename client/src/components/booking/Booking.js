import React, { Fragment, useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import TextField from "@material-ui/core/TextField"
import { createBooking } from "../../actions/booking"
import { getHallById } from "../../actions/hall"
import PropTypes from "prop-types"
import HallBookingInfo from "./HallBookingInfo"
import Spinner from "../layout/Spinner"

const Booking = ({
  hall: { hall, loading },
  createBooking,
  match,
  getHallById,
  history,
}) => {
  const hall_id = match.params.id
  useEffect(() => {
    getHallById(hall_id)
  }, [getHallById, match.params.id])
  const [formData, setFormData] = useState({
    startAt: "",
    endAt: "",
  })
  const { startAt, endAt } = formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    createBooking(formData, hall_id, history)
  }

  return (
    <Fragment>
      {hall === null || loading ? (
        <Spinner />
      ) : (
        <div className="flex-container">
          <HallBookingInfo />
          <div>
            <h1 className="lead">
              <i className="fas fa-calendar"></i> Make your Booking
            </h1>
            <form className="form" onSubmit={(e) => onSubmit(e)} noValidate>
              <div className="form-group"></div>
              <TextField
                name="startAt"
                label="Starting Date"
                type="datetime-local"
                value={startAt}
                onChange={(e) => onChange(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className="form-group">
                <TextField
                  name="endAt"
                  label="Ending Date"
                  type="datetime-local"
                  value={endAt}
                  onChange={(e) => onChange(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Place Your Booking"
              />
            </form>
          </div>
        </div>
      )}
    </Fragment>
  )
}

Booking.propTypes = {
  createBooking: PropTypes.func.isRequired,
  getHallById: PropTypes.func.isRequired,
  hall: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  hall: state.hall,
})

export default connect(mapStateToProps, { createBooking, getHallById })(
  withRouter(Booking)
)
