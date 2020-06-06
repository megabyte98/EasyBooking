import React, { Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Halls from "../halls/Halls"

const Dashboard = ({ auth: { user } }) => {
  return (
    <div>
      {" "}
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.firstName}
      </p>
      <Fragment>
        <Halls />
      </Fragment>
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(Dashboard)
