import React, { Fragment, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Landing from "./components/layout/Landing"
import Navbar from "./components/layout/Navbar"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Alert from "./components/layout/Alert"
import Dashboard from "./components/dashboard/Dashboard"
import Halls from "./components/halls/Halls"
import MyBookings from "./components/booking/MyBookings"
import Booking from "./components/booking/Booking"
import setAuthToken from "./utils/setAuthToken"
import { Provider } from "react-redux"
import store from "./store"
import PrivateRoute from "./components/routing/PrivateRoute"

import { loadUser } from "./actions/auth"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/halls" component={Halls} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/myBookings" component={MyBookings} />
              <PrivateRoute exact path="/:id" component={Booking} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
