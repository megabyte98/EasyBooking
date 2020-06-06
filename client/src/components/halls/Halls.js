import React, { Fragment, useEffect } from "react"
import Spinner from "../layout/Spinner"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getAllHalls } from "../../actions/hall"
import HallItem from "./HallItem"
const Halls = ({ getAllHalls, hall: { halls, loading } }) => {
  useEffect(() => {
    getAllHalls()
  }, [getAllHalls])
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Seminar Halls</h1>
          <p className="lead">Browse and Book Hall of Your Choice</p>
          <div className="profiles">
            {halls != null && halls.length > 0 ? (
              halls.map((hall) => <HallItem key={hall._id} hall={hall} />)
            ) : (
              <h4>No Halls Found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Halls.propTypes = {
  getAllHalls: PropTypes.func.isRequired,
  hall: PropTypes.object.isRequired,
}

const mapStatToProps = (state) => ({
  hall: state.hall,
})

export default connect(mapStatToProps, { getAllHalls })(Halls)
