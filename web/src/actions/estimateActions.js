import axios from 'axios'
import Swal from 'sweetalert2'
import {
  START_GETTING_ESTIMATE_DETAILS,
  GET_ESTIMATE_DETAILS_SUCCESS,
  GET_ESTIMATE_DETAILS_ERROR,
  START_CLEANING_ESTIMATE_DETAILS,
  CLEAN_ESTIMATE_DETAILS_SUCCESS,
  CLEAN_ESTIMATE_DETAILS_ERROR,
  START_ESTIMATING_CONFORMATIONAL_DIVERSITY,
  ESTIMATE_CONFORMATIONAL_DIVERSITY_SUCCESS,
  ESTIMATE_CONFORMATIONAL_DIVERSITY_ERROR,
  START_ESTIMATING_IN_THE_BACKGROUND,
  ESTIMATE_IN_THE_BACKGROUND_SUCCESS,
  ESTIMATE_IN_THE_BACKGROUND_ERROR,
} from '../types'

// Function that gets the estimate details
export function getEstimateDetailsAction(repeatId) {
  return async (dispatch) => {
    dispatch(getEstimateDetails())
    try {
      const urlEstimate = `/api/estimate/search/${repeatId}`
      const [res1] = await Promise.all([axios(urlEstimate)])
      dispatch(
        getEstimateDetailsSuccess({
          res1: res1.data.payload.genInfo,
          res2: res1.data.payload.strucInfo,
          res3: res1.data.payload.conformers,
        })
      )
    } catch (error) {
      dispatch(getEstimateDetailsError())
    }
  }
}

const getEstimateDetails = () => ({
  type: START_GETTING_ESTIMATE_DETAILS,
  payload: true,
})

const getEstimateDetailsSuccess = (data) => ({
  type: GET_ESTIMATE_DETAILS_SUCCESS,
  payload: data,
})

const getEstimateDetailsError = () => ({
  type: GET_ESTIMATE_DETAILS_ERROR,
  payload: true,
})

// Function that cleans the estimate details
export function cleanEstimateDetailsAction() {
  return (dispatch) => {
    dispatch(cleanEstimateDetails())
    try {
      dispatch(cleanEstimateDetailsSuccess())
    } catch (error) {
      dispatch(cleanEstimateDetailsError())
    }
  }
}

const cleanEstimateDetails = () => ({
  type: START_CLEANING_ESTIMATE_DETAILS,
  payload: true,
})

const cleanEstimateDetailsSuccess = () => ({
  type: CLEAN_ESTIMATE_DETAILS_SUCCESS,
})

const cleanEstimateDetailsError = () => ({
  type: CLEAN_ESTIMATE_DETAILS_ERROR,
  payload: true,
})

// Function that estimates conformational diversity
export function estimateConformationalDiversityAction(repeatId) {
  return async (dispatch) => {
    dispatch(estimateConformationalDiversity())
    try {
      const urlEstimate = `/api/estimate/${repeatId}`
      const [res1] = await Promise.all([axios(urlEstimate)])
      dispatch(
        estimateConformationalDiversitySuccess({
          res1: res1.data.payload.genInfo,
          res2: res1.data.payload.strucInfo,
          res3: res1.data.payload.conformers,
        })
      )
    } catch (error) {
      dispatch(estimateConformationalDiversityAError())
    }
  }
}

const estimateConformationalDiversity = () => ({
  type: START_ESTIMATING_CONFORMATIONAL_DIVERSITY,
  payload: true,
})

const estimateConformationalDiversitySuccess = (data) => ({
  type: ESTIMATE_CONFORMATIONAL_DIVERSITY_SUCCESS,
  payload: data,
})

const estimateConformationalDiversityAError = () => ({
  type: ESTIMATE_CONFORMATIONAL_DIVERSITY_ERROR,
  payload: true,
})

// Function that estimates conformational diversity in the background
export function estimateInTheBackgroundAction(body) {
  return async (dispatch) => {
    dispatch(estimateInTheBackground())
    try {
      const urlEstimate = '/api/estimate'
      await axios.post(urlEstimate, body)
      dispatch(estimateInTheBackgroundSuccess())
      Swal.fire('Success', 'The request has been sent successfully', 'success')
    } catch (error) {
      dispatch(estimateInTheBackgroundError())
    }
  }
}

const estimateInTheBackground = () => ({
  type: START_ESTIMATING_IN_THE_BACKGROUND,
  payload: true,
})

const estimateInTheBackgroundSuccess = () => ({
  type: ESTIMATE_IN_THE_BACKGROUND_SUCCESS,
})

const estimateInTheBackgroundError = () => ({
  type: ESTIMATE_IN_THE_BACKGROUND_ERROR,
  payload: true,
})
