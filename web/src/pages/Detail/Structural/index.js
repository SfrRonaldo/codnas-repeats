import { Fragment } from 'react'
import PropTypes from 'prop-types'

const Structural = ({ structural }) => {
  return (
    <Fragment>
      <div className="bg-white shadow-md hover:shadow-2xl rounded-xl">
        <div className="p-4 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 text-justify">Structural Information</h2>
          {structural.map((item) => (
            <div key={item.region} className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-700 text-justify">Region {item.region}</h2>
              <div className="overflow-x-auto overflow-y-auto border">
                <table className="w-full table-auto table-striped">
                  <tbody className="w-full">
                    <tr className="h-11 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                      <td className="text-left px-2 md:px-4">
                        <p className="text-xs sm:text-sm font-bold leading-none text-gray-800">#Conf.:</p>
                      </td>
                      <td className="text-left pl-10 pr-2 md:px-10 ">
                        <p className="text-xs sm:text-sm leading-5 text-gray-600">{item.num_conf}</p>
                      </td>
                      <td className="text-left px-2 md:px-4">
                        <p className="text-xs sm:text-sm font-bold leading-none text-gray-800">RMSD Min[Å]:</p>
                      </td>
                      <td className="text-left pl-10 pr-2 md:px-10 ">
                        <p className="text-xs sm:text-sm leading-5 text-gray-600">{item.rmsd_min}</p>
                      </td>
                    </tr>
                    <tr className="h-11 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                      <td className="text-left px-2 md:px-4">
                        <p className="text-xs sm:text-sm font-bold leading-none text-gray-800">RMSD Max[Å]:</p>
                      </td>
                      <td className="text-left pl-10 pr-2 md:px-10 ">
                        <p className="text-xs sm:text-sm leading-5 text-gray-600">{item.rmsd_max}</p>
                      </td>
                      <td className="text-left px-2 md:px-4">
                        <p className="text-xs sm:text-sm font-bold leading-none text-gray-800">RMSD Avg[Å]:</p>
                      </td>
                      <td className="text-left pl-10 pr-2 md:px-10 ">
                        <p className="text-xs sm:text-sm leading-5 text-gray-600">{item.rmsd_avg}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

Structural.propTypes = {
  structural: PropTypes.array.isRequired,
}

export default Structural
