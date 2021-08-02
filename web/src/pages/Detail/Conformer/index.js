import { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@material-ui/core'
import ConformerTable from '../../../components/ConformerTable'

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'],
  },
})

const Conformer = ({ id, general, conformers }) => {
  const [array, setArray] = useState([])

  useEffect(() => {
    const repeats = []
    for (let i = 1; i <= general.num_regions; i++) {
      const data = []
      conformers.forEach((conf) => {
        if (conf.region === i) data.push(conf)
      })
      const obj = { num_region: i, data: data }
      repeats.push(obj)
    }
    setArray(repeats)
  }, [])

  return (
    <Fragment>
      <div className="bg-white shadow-md hover:shadow-2xl rounded-xl">
        <div className="p-4 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 text-justify">Conformers</h2>
          <ThemeProvider theme={theme}>
            {array.length !== 0 && <ConformerTable list={array[0]} id={id} flag="true" />}
            {array.length > 1 && <ConformerTable list={array[1]} id={id} flag="true" />}
            {array.length > 2 && <ConformerTable list={array[2]} id={id} flag="true" />}
            {array.length > 3 && <ConformerTable list={array[3]} id={id} flag="true" />}
          </ThemeProvider>
        </div>
      </div>
    </Fragment>
  )
}

Conformer.propTypes = {
  id: PropTypes.string.isRequired,
  general: PropTypes.any.isRequired,
  conformers: PropTypes.array.isRequired,
}

export default Conformer
