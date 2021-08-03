import { Fragment } from 'react'

const Section3 = () => {
  return (
    <Fragment>
      <div id="results" className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">3. Results</h1>
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 text-justify">
          3.1. Results of the conformational diversity information search
        </h2>
        <p className="text-sm sm:text-base text-justify">
          Once the &ldquo;Search&rdquo; button is pressed, the user is redirected to the Detail window, which details
          the data collected from the search in the CoDNaS-Repeats database of the conformational diversity information
          of the repeated protein chain entered. The sections displayed in the Detail window are described below.
        </p>
        <h3 className="text-base sm:text-lg font-bold text-gray-700 text-justify">Section 1: General Information</h3>
        <p className="text-sm sm:text-base text-justify">
          This section presents the general information of the repeated protein.
        </p>
        <ul className="list-decimal list-inside text-sm sm:text-base space-y-2 font-bold text-gray-700">
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Repeat Protein Name: </span>
            <span className="text-sm sm:text-base font-normal">
              Representative name of the protein extracted from RCSB PDB.
            </span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Title: </span>
            <span className="text-sm sm:text-base font-normal text-black">Title representing the protein.</span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Organism: </span>
            <span className="text-sm sm:text-base font-normal text-black">
              Organism to which the repeat protein belongs.
            </span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Sequence Length: </span>
            <span className="text-sm sm:text-base font-normal text-black">
              Amount of amino acids in the repeated protein chain.
            </span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Classification: </span>
            <span className="text-sm sm:text-base font-normal text-black">Protein type classified by RCSB PDB.</span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Cluster: </span>
            <span className="text-sm sm:text-base font-normal text-black">
              Cluster to which the repeated protein belongs.
            </span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">#Repeating Regions: </span>
            <span className="text-sm sm:text-base font-normal text-black">
              Number of repeat regions that the repeat protein has.
            </span>
          </li>
        </ul>
        <hr />
        <h3 className="text-base sm:text-lg font-bold text-gray-700 text-justify">Section 2: Structural Information</h3>
        <p className="text-sm sm:text-base text-justify">
          The Structural Information section (See Figure N.5) provides comparative structural data between all the
          conformations of the repeat protein, including the same. These data include the number of conformations,
          showing the available evidence on the conformational diversity of the repeat protein. In addition, the
          minimum, maximum and average RMSDs determined by the TMalign software are displayed. These values provide the
          central measures of conformational diversity.
        </p>
        <hr />
        <h3 className="text-base sm:text-lg font-bold text-gray-700 text-justify">Section 3: Conformers</h3>
        <p className="text-sm sm:text-base text-justify">
          This section shows the various conformations that the repeat protein possesses based on its repeat regions.
          Likewise, the repeated region for each conformer is presented through the lower limit and upper limit that
          represent its range, the sequence identity expressed in a numerical value and the structural difference
          between the repeated protein and the respective conformation by RMSD statistical measurement.
        </p>
        <hr />
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 text-justify">
          3.2. Results of the estimation of conformational diversity
        </h2>
        <p className="text-sm sm:text-base text-justify">
          Once the &ldquo;Estimate&rdquo; button is pressed, the user is redirected to the Estimate window, which
          details the data collected from the conformational diversity estimate of the entered repeated protein chain.
          The sections displayed in the Estimation window are described below.
        </p>
        <h3 className="text-base sm:text-lg font-bold text-gray-700 text-justify">Section 1: General Information</h3>
        <p className="text-sm sm:text-base text-justify">
          This section presents the general information of the repeat protein.
        </p>
        <ul className="list-decimal list-inside text-sm sm:text-base space-y-2 font-bold text-gray-700">
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Repeat Protein Name: </span>
            <span className="text-sm sm:text-base font-normal">
              Representative name of the protein extracted from RCSB PDB.
            </span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Title: </span>
            <span className="text-sm sm:text-base font-normal text-black">Title representing the protein.</span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Organism: </span>
            <span className="text-sm sm:text-base font-normal text-black">
              Organism to which the repeat protein belongs.
            </span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Classification: </span>
            <span className="text-sm sm:text-base font-normal text-black">Protein type classified by RCSB PDB.</span>
          </li>
          <li className="text-justify">
            <span className="text-sm sm:text-base text-gray-700">Repeated region: </span>
            <span className="text-sm sm:text-base font-normal text-black">
              Repeat region of the repeat protein to estimate.
            </span>
          </li>
        </ul>
        <hr />
        <h3 className="text-base sm:text-lg font-bold text-gray-700 text-justify">Section 2: Structural Information</h3>
        <p className="text-sm sm:text-base text-justify">
          The Structural Information section provides comparative structural data between all the conformations of the
          repeat protein, including itself. These data include the number of conformations, showing the available
          evidence on the conformational diversity of the repeat protein. In addition, the minimum, maximum and average
          RMSDs determined by the TMalign software are displayed. These values provide the central measures of
          conformational diversity.
        </p>
        <hr />
        <h3 className="text-base sm:text-lg font-bold text-gray-700 text-justify">Section 3: Conformers</h3>
        <p className="text-sm sm:text-base text-justify">
          This section shows the various conformations that the repeat protein possesses as a function of the repeat
          region of the same entered as input data. Likewise, for each conformer, the repeated region is presented
          through the lower limit and the upper limit, representing its range, the identity sequence expressed in a
          numerical value and the structural difference between the repeated protein and the respective conformation
          through the RMSD statistical measurement.
        </p>
      </div>
    </Fragment>
  )
}

export default Section3
