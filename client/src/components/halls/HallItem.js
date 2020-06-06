import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const HallItem = ({ hall: { capacity, hallName, description, _id } }) => {
  return (
    <div className="profile bg-light">
      <img src="" alt="" className="round-img" />
      <div>
        <h2>{hallName}</h2>
        <p> {description}</p>
        <p className="my-1">Capacity : {capacity && <span>{capacity}</span>}</p>
        <Link to={`/${_id}`} className="btn btn-primary">
          Book Hall
        </Link>
      </div>
    </div>
  )
}

HallItem.propTypes = {
  hall: PropTypes.object.isRequired,
}

export default HallItem
