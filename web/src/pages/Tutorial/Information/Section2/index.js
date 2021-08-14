import { Fragment } from 'react'
import EstimateOption from '../../../../assets/img/estimate-option.png'
import SearchOption from '../../../../assets/img/search-option.png'

const Section2 = () => {
  return (
    <Fragment>
      <div id="how-to-use" className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">2. How to use CoDNaS-Repeats</h1>
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 text-justify">
          2.1. Search for information on conformational diversity
        </h2>
        <p className="text-sm sm:text-base text-justify">
          To obtain information on the conformational diversity of a repeated protein, the user must enter the main page
          of the user interface, enter the pdb id of the repeated protein and select the &ldquo;Search&rdquo; option.
          Through this option, the user will be able to extract from the CoDNaS-Repeats database the conformational
          diversity information (general information, structural information and conformers) of any repeated protein
          registered to date. Likewise, if the user does not remember the repeated protein that he wants to search for,
          the tool will grant him the autofill to facilitate his search.
        </p>
        <img src={SearchOption} alt="search option" />
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 text-justify">
          2.2. Estimate conformational diversity
        </h2>
        <p className="text-sm sm:text-base text-justify">
          To estimate the conformational diversity of any repeat protein, the user must enter the main page of the user
          interface, enter the pdb id of the repeat protein and the repeat region. After entering the aforementioned
          data, the user must press the &ldquo;Estimate&rdquo; option. Through this option, the user will be able to
          estimate the conformational diversity of the repeated protein that has entered the text field. Also, in case
          the user does not remember the repeated protein that he wants to estimate, the tool will grant him the
          autofill to facilitate his estimation.
        </p>
        <img src={EstimateOption} alt="estimate option" />
      </div>
    </Fragment>
  )
}

export default Section2
