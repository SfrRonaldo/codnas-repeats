import { Fragment } from 'react'
import PropTypes from 'prop-types'

const General = ({ id, general }) => {
  return (
    <Fragment>
      <div className="bg-white shadow-md hover:shadow-2xl rounded-xl">
        <div className="p-4 space-y-4">
          <h1 className="text-gray-700 text-3xl md:text-4xl font-bold text-center">{id}</h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 text-justify">General Information</h2>
          <div className="overflow-x-auto overflow-y-auto border">
            <table className="w-full table-fixed table-striped">
              <tbody className="w-full">
                <tr className="h-11 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="w-1/3 text-left px-2 md:px-4">
                    <p className="text-xs sm:text-sm font-medium leading-none text-gray-800">Repeat protein name:</p>
                  </td>
                  <td className="w-2/3 text-left pl-10 pr-2 md:px-10 ">
                    <p className="text-xs sm:text-sm leading-5 text-gray-600">{general.name}</p>
                  </td>
                </tr>
                <tr className="h-11 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="text-left px-2 md:px-4">
                    <p className="text-xs sm:text-sm font-medium leading-none text-gray-800">Title:</p>
                  </td>
                  <td className="text-left pl-10 pr-2 md:px-10 ">
                    <p className="text-xs sm:text-sm leading-5 text-gray-600">{general.title}</p>
                  </td>
                </tr>
                <tr className="h-11 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="text-left px-2 md:px-4">
                    <p className="text-xs sm:text-sm font-medium leading-none text-gray-800">Organism:</p>
                  </td>
                  <td className="text-left pl-10 pr-2 md:px-10 ">
                    <p className="text-xs sm:text-sm leading-5 text-gray-600">{general.organism}</p>
                  </td>
                </tr>
                <tr className="h-11 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="text-left px-2 md:px-4">
                    <p className="text-xs sm:text-sm font-medium leading-none text-gray-800">Sequence length:</p>
                  </td>
                  <td className="text-left pl-10 pr-2 md:px-10 ">
                    <p className="text-xs sm:text-sm leading-5 text-gray-600">{general.seqres}</p>
                  </td>
                </tr>
                <tr className="h-11 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="text-left px-2 md:px-4">
                    <p className="text-xs sm:text-sm font-medium leading-none text-gray-800">Classification:</p>
                  </td>
                  <td className="text-left pl-10 pr-2 md:px-10 ">
                    <p className="text-xs sm:text-sm leading-5 text-gray-600">{general.classification}</p>
                  </td>
                </tr>
                <tr className="h-11 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="text-left px-2 md:px-4">
                    <p className="text-xs sm:text-sm font-medium leading-none text-gray-800">Cluster:</p>
                  </td>
                  <td className="text-left pl-10 pr-2 md:px-10 ">
                    <p className="text-xs sm:text-sm leading-5 text-gray-600">{general.cluster}</p>
                  </td>
                </tr>
                <tr className="h-11 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                  <td className="text-left px-2 md:px-4">
                    <p className="text-xs sm:text-sm font-medium leading-none text-gray-800">#Repeating Regions::</p>
                  </td>
                  <td className="text-left pl-10 pr-2 md:px-10 ">
                    <p className="text-xs sm:text-sm leading-5 text-gray-600">{general.num_regions}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

General.propTypes = {
  id: PropTypes.string.isRequired,
  general: PropTypes.any.isRequired,
}

export default General
