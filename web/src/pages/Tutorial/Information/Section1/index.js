import { Fragment } from 'react'
import Home from '../../../../assets/img/codnas-repeats.png'

const Section1 = () => {
  return (
    <Fragment>
      <div className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">1. CoDNaS-Repeats</h1>
        <p className="text-sm sm:text-base text-justify">
          This tool allows searching the CoDNaS-Repeats database for the results obtained using the method that analyzes
          the conformational diversity of the repeated proteins based on the repetitive domain (repeated regions) and in
          case it is not found in it, you have the option of estimating the conformational diversity of the repeated
          protein that is entered. Likewise, for any questions that the user may have, there is a section called
          Tutorial where the steps that must be followed to properly handle the tool are detailed. The user can access
          this section through the header or by pressing the option “How to evaluate?”.
        </p>
        <img src={Home} alt="codnas-repeats" />
      </div>
    </Fragment>
  )
}

export default Section1
