import React, { Fragment, useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Moment from "react-moment"
import { getAllMyBookings, deleteBooking } from "../../actions/booking"
import { withRouter } from "react-router-dom"

const MyBookings = ({
  getAllMyBookings,
  deleteBooking,
  booking: { bookings, loading },
  history,
}) => {
  useEffect(() => {
    getAllMyBookings()
  }, [getAllMyBookings])

  const myBookings = bookings.map((book) => (
    <tr key={book._id}>
      <td>{book.hallName}</td>
      <td>
        <Moment format="DD/MM/YYYY">{book.startAt}</Moment> -{" "}
        <Moment format="DD/MM/YYYY">{book.endAt}</Moment>
      </td>
      <td>
        <Moment format="hh:mm A">{book.startAt}</Moment> -{" "}
        <Moment format="hh:mm A">{book.endAt}</Moment>
      </td>
      <td>
        <button
          onClick={() => deleteBooking(book.hall, book._id, history)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">My Bookings</h2>
        {bookings.length > 0 ? (
          <Fragment>
            <table className="table">
              <thead>
                <tr>
                  <th>Seminar Hall Name</th>
                  <th className="hide-sm">Starting Date - Ending Date</th>
                  <th className="hide-sm">Starting Time - Ending Time</th>
                  <th />
                </tr>
              </thead>
              <tbody>{myBookings}</tbody>
            </table>
          </Fragment>
        ) : (
          <h4>No Bookings Found go to halls And Find and book a hall</h4>
        )}
      </div>
    </Fragment>
  )
}

MyBookings.propTypes = {
  getAllMyBookings: PropTypes.func.isRequired,
  deleteBooking: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  booking: state.booking,
})

export default connect(mapStateToProps, { getAllMyBookings, deleteBooking })(
  withRouter(MyBookings)
)
