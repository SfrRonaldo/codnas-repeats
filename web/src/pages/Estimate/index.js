import { Fragment, useState } from 'react'
import ReactLoading from 'react-loading'

const Estimate = () => {
  const [load] = useState(false)

  return (
    <Fragment>
      <div className="pt-6 pb-40">
        <div className="px-4 sm:px-16 lg:px-32 xl:px-48 2xl:px-60 mx-auto">
          <div className="max-w-full px-1 mx-auto lg:px-4">
            {!load && (
              <div className="pt-12 space-y-4">
                <div id="loader" style={{ textAlign: '-webkit-center' }}>
                  <ReactLoading type="spin" color="#d0646c" />
                </div>
                <div className="text-center">
                  <span>Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Estimate
