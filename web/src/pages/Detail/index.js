import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRepeatDetailsAction } from '../../actions/repeatActions'
import ReactLoading from 'react-loading'
import General from './General'
import Structural from './Structural'
import Conformer from './Conformer'

const Detail = () => {
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

  return (
    <Fragment>
      <div className="pt-6 pb-40">
        <div className="px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-60 mx-auto">
          <div className="max-w-full px-1 mx-auto lg:px-4">
            {!general && (
              <div id="loader" className="pt-12" style={{ textAlign: '-webkit-center' }}>
                <ReactLoading type="spin" color="#d0646c" />
              </div>
            )}
            <div className="pt-8">{general && <General id={pdbId} general={general} />}</div>
            <div className="pt-12">{general && <Structural structural={structural} />}</div>
            <div className="pt-12">{general && <Conformer id={pdbId} general={general} conformers={conformers} />}</div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Detail
