import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Preloader from '../Preloader'

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Route
      {...rest}
      render={(props) => (
        <Fragment>
          <Preloader show={!loaded} />
          <Component {...props} />
        </Fragment>
      )}
    />
  )
}

export default RouteWithLoader

RouteWithLoader.propTypes = {
  component: PropTypes.any.isRequired,
}
