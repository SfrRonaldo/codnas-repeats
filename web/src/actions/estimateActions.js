import axios from 'axios'
import {
  START_GETTING_ESTIMATE_DETAILS,
  GET_ESTIMATE_DETAILS_SUCCESS,
  GET_ESTIMATE_DETAILS_ERROR,
  START_CLEANING_ESTIMATE_DETAILS,
  CLEAN_ESTIMATE_DETAILS_SUCCESS,
  CLEAN_ESTIMATE_DETAILS_ERROR,
} from '../types'

// Function that gets the estimate details
export function getRepeatEstimateDetailsAction(repeatId) {
  return async (dispatch) => {
    dispatch(getEstimateDetails())
    try {
      const urlGeneralInformation = `/api/repeats/genInformation/${repeatId}`
      const urlStructuralInformation = `/api/repeats/strucInformation/${repeatId}`
      const urlConformers = `/api/repeats/conformers/${repeatId}`
      const [res1, res2, res3] = await Promise.all([
        axios(urlGeneralInformation),
        axios(urlStructuralInformation),
        axios(urlConformers),
      ])
      dispatch(
        getEsimateDetailsSuccess({
          res1: res1.data.payload,
          res2: res2.data.payload,
          res3: res3.data.payload,
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

const getEsimateDetailsSuccess = (data) => ({
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
