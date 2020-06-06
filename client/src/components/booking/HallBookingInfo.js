import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"
import { connect } from "react-redux"
import Spinner from "../layout/Spinner"

const HallBookingInfo = ({ hall: { hallName, bookings, loading } }) => {
  const hallBookings = bookings.map((book) => (
    <tr key={book._id}>
      <td>{book.firstName + " " + book.lastName}</td>
      <td>
        <Moment format="DD/MM/YYYY">{book.startAt}</Moment> -{" "}
        <Moment format="DD/MM/YYYY">{book.endAt}</Moment>
      </td>
      <td>
        <Moment format="hh:mm:ss A">{book.startAt}</Moment> -{" "}
        <Moment format="hh:mm:ss A">{book.endAt}</Moment>
      </td>
    </tr>
  ))
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {" "}
          <h1 className="text-primary">
            This Month's Bookings of {hallName} :{" "}
          </h1>
          {bookings.length > 0 ? (
            <Fragment>
              <table className="table">
                <thead>
                  <tr>
                    <th>Booker's Name</th>
                    <th className="hide-sm">Starting Date - Ending Date</th>
                    <th className="hide-sm">Starting Time - Ending Time</th>
                  </tr>
                </thead>
                <tbody>{hallBookings}</tbody>
              </table>
            </Fragment>
          ) : (
            <h4>No Bookings for this month till now</h4>
          )}
        </Fragment>
      )}
    </div>
  )
}

HallBookingInfo.propTypes = {
  hall: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  hall: state.hall.hall,
})

export default connect(mapStateToProps)(HallBookingInfo)
