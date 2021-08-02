import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@material-ui/core'
import ConformerTable from '../../../components/ConformerTable'

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'],
  },
})

const Conformers = ({ conformers }) => {
  return (
    <Fragment>
      <div className="bg-white shadow-md hover:shadow-2xl rounded-xl">
        <div className="p-4 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 text-justify">Conformers</h2>
          <ThemeProvider theme={theme}>
            <ConformerTable list={conformers} />
          </ThemeProvider>
        </div>
      </div>
    </Fragment>
  )
}

Conformers.propTypes = {
  conformers: PropTypes.any.isRequired,
}

export default Conformers
