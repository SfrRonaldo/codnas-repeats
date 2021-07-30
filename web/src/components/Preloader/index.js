import React from 'react'
import PropTypes from 'prop-types'

const Preloader = ({ show }) => {
  const circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full bg-primary-light'

  return (
    <>
      <div className={`elevate bg-gray-100 ${show ? '' : 'show'}`}>
        <div className={`${circleCommonClasses} mr-1 animate-bounce  ${show ? '' : 'loaded'}`}></div>
        <div className={`${circleCommonClasses} mr-1 animate-bounce200  ${show ? '' : 'loaded'}`}></div>
        <div className={`${circleCommonClasses} animate-bounce400 ${show ? '' : 'loaded'}`}></div>
      </div>
    </>
  )
}

Preloader.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Preloader
