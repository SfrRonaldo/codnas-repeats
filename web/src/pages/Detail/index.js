import { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRepeatDetailsAction } from '../../actions/repeatActions'
import ReactLoading from 'react-loading'
import General from './General'

const Detail = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const { id } = params
  console.log(id)
  useEffect(() => {
    const getRepeatDetails = () => dispatch(getRepeatDetailsAction(id))
    getRepeatDetails()
  }, [])

  const general = useSelector((state) => state.repeat.general)

  return (
    <Fragment>
      <div className="pt-6 pb-40">
        <div className="px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-60 mx-auto">
          <div className="max-w-full px-1 mx-auto lg:px-4">
            {!general && (
              <div id="loader" className="pt-12" style={{ textAlign: '-webkit-center' }}>
                <ReactLoading type="spin" color="#2d699b" />
              </div>
            )}
            <div className="pt-8">{general && <General id={id} general={general} />}</div>
            <div className="pt-12">{general && <General id={id} general={general} />}</div>
            <div className="pt-12">{general && <General id={id} general={general} />}</div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Detail
