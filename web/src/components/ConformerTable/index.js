import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TablePagination,
} from '@material-ui/core'
import Pagination from '../Pagination'

const ConformerTable = ({ list, id, flag }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className="space-y-4">
      {flag === 'true' && (
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 text-justify">Region {list.num_region}</h2>
      )}
      <TableContainer className="table-container" component={Paper}>
        <Table size="small" aria-label="simple data">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row" className="table__cell" align="center">
                <span className="text-xs sm:text-sm font-bold leading-none text-gray-800">Conf. 1</span>
              </TableCell>
              <TableCell component="th" scope="row" className="table__cell" align="center">
                <span className="text-xs sm:text-sm font-bold leading-none text-gray-800">Conf. 2</span>
              </TableCell>
              <TableCell component="th" scope="row" className="table__cell" align="center">
                <span className="text-xs sm:text-sm font-bold leading-none text-gray-800">Lower Limit 1</span>
              </TableCell>
              <TableCell component="th" scope="row" className="table__cell" align="center">
                <span className="text-xs sm:text-sm font-bold leading-none text-gray-800">Upper Limit 1</span>
              </TableCell>
              <TableCell component="th" scope="row" className="table__cell" align="center">
                <span className="text-xs sm:text-sm font-bold leading-none text-gray-800">Lower Limit 2</span>
              </TableCell>
              <TableCell component="th" scope="row" className="table__cell" align="center">
                <span className="text-xs sm:text-sm font-bold leading-none text-gray-800">Upper Limit 2</span>
              </TableCell>
              <TableCell component="th" scope="row" className="table__cell" align="center">
                <span className="text-xs sm:text-sm font-bold leading-none text-gray-800">Seq. Identity</span>
              </TableCell>
              <TableCell component="th" scope="row" className="table__cell" align="center">
                <span className="text-xs sm:text-sm font-bold leading-none text-gray-800">RMSD [Å]</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flag === 'true'
              ? list.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r, index) => (
                  <TableRow key={index}>
                    {r.conformer_1 === id ? (
                      <>
                        <TableCell>
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.conformer_1}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.conformer_2}</span>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.lower_1}</span>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.upper_1}</span>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.lower_2}</span>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.upper_2}</span>
                        </TableCell>
                        <TableCell align="right">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">
                            {parseFloat(r.seq_id) / 1000}
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.rmsd}</span>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.conformer_2}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.conformer_1}</span>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.lower_2}</span>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.upper_2}</span>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.lower_1}</span>
                        </TableCell>
                        <TableCell align="center">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.upper_1}</span>
                        </TableCell>
                        <TableCell align="right">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">
                            {parseFloat(r.seq_id) / 1000}
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.rmsd}</span>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              : list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.conformer1}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.conformer2}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.lower1}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.upper1}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.lower2}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.upper2}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.seqId}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-xs sm:text-sm leading-5 text-gray-600">{r.rmsd}</span>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="table-container"
        rowsPerPageOptions={[
          5,
          10,
          15,
          {
            label: 'All',
            value: flag ? list.data.length : list.length,
          },
        ]}
        component="div"
        count={flag ? list.data.length : list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'PDB per page' },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={Pagination}
        labelRowsPerPage="PDB per page"
      />
    </div>
  )
}

ConformerTable.defaultProps = {
  flag: 'false',
  id: '',
}

ConformerTable.propTypes = {
  id: PropTypes.string,
  list: PropTypes.any.isRequired,
  flag: PropTypes.string,
}

export default ConformerTable
