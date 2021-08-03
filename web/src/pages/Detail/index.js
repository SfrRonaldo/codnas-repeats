import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRepeatDetailsAction } from '../../actions/repeatActions'
import ReactLoading from 'react-loading'
import General from './General'
import Structural from './Structural'
import Conformer from './Conformer'

const Detail = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const { id } = params

  const [pdbId, setPdbId] = useState('')

  useEffect(() => {
    setPdbId(id.split('_')[0].toLowerCase() + '_' + id.split('_')[1])
    const getRepeatDetails = () => dispatch(getRepeatDetailsAction(id))
    getRepeatDetails()
  }, [])

  const general = useSelector((state) => state.repeat.general)
  const structural = useSelector((state) => state.repeat.structural)
  const conformers = useSelector((state) => state.repeat.conformers)
  const error = useSelector((state) => state.repeat.error)

  return (
    <Fragment>
      <div className="pt-6 pb-40">
        <div className="px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-60 mx-auto">
          <div className="max-w-full px-1 mx-auto lg:px-4">
            {!general &&
              (!error ? (
                <div className="pt-12 space-y-4">
                  <div id="loader" style={{ textAlign: '-webkit-center' }}>
                    <ReactLoading type="spin" color="#d0646c" />
                  </div>
                  <div className="text-center">
                    <span>Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="py-5 sm:py-10 space-y-4">
                  <h1 className="text-gray-700 text-3xl md:text-4xl font-bold text-left">Results Not Found</h1>
                  <h2>The results you are looking for are not found.</h2>
                  <h2>Try searching again or use the Go Back button below.</h2>
                  <button
                    className="px-4 py-2 bg-primary-dark rounded hover:bg-opacity-90 text-white border-1"
                    onClick={() => history.push('/home')}
                  >
                    Go back home
                  </button>
                </div>
              ))}
            <div className="pt-8">{general && <General id={pdbId} general={general} />}</div>
            <div className="pt-12">{general && <Structural structural={structural} />}</div>
            <div className="pt-12">{general && <Conformer id={pdbId} general={general} conformers={conformers} />}</div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Detail.propTypes = {
  history: PropTypes.any.isRequired,
}

export default Detail
