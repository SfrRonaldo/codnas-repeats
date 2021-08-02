import PropTypes from 'prop-types'

const NotFound = ({ history }) => {
  return (
    <div className="pt-6 pb-52">
      <div className="px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-60">
        <div className="py-5 px-1 lg:px-4 sm:py-10 space-y-4">
          <h1 className="text-gray-700 text-3xl md:text-4xl font-bold text-left">Not Found</h1>
          <h2>The page you are looking for is not available.</h2>
          <h2>Try searching again or use the Go Back button below.</h2>
          <button
            className="px-4 py-2 bg-primary-dark rounded hover:bg-opacity-90 text-white border-1"
            onClick={() => history.push('/home')}
          >
            Go back home
          </button>
        </div>
      </div>
    </div>
  )
}

NotFound.propTypes = {
  history: PropTypes.any.isRequired,
}

export default NotFound
