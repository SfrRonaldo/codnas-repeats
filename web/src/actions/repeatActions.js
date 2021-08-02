import clientAxios from '../config/axios'
import {
  START_GETTING_REPEAT_DETAILS,
  GET_REPEAT_DETAILS_SUCCESS,
  GET_REPEAT_DETAILS_ERROR,
  START_CLEANING_REPEAT_DETAILS,
  CLEAN_REPEAT_DETAILS_SUCCESS,
  CLEAN_REPEAT_DETAILS_ERROR,
} from '../types'

// Function that gets the repeat details
export function getRepeatDetailsAction(repeatId) {
  return async (dispatch) => {
    dispatch(getRepeatDetails())
    try {
      const urlGeneralInformation = `/api/repeats/genInformation/${repeatId}`
      const urlStructuralInformation = `/cluster/strucInformation/${repeatId}`
      const urlConformers = `/cluster/conformers/${repeatId}`
      const [res1, res2, res3] = await Promise.all([
        clientAxios(urlGeneralInformation),
        clientAxios(urlStructuralInformation),
        clientAxios(urlConformers),
      ])
      dispatch(
        getRepeatDetailsSuccess({
          res1: res1.data.payload,
          res2: res2.data.payload,
          res3: res3.data.payload,
        })
      )
    } catch (error) {
      dispatch(getRepeatDetailsError())
    }
  }
}

const getRepeatDetails = () => ({
  type: START_GETTING_REPEAT_DETAILS,
  payload: true,
})

const getRepeatDetailsSuccess = (data) => ({
  type: GET_REPEAT_DETAILS_SUCCESS,
  payload: data,
})

const getRepeatDetailsError = () => ({
  type: GET_REPEAT_DETAILS_ERROR,
  payload: true,
})

// Function that cleans the repeat details
export function cleanRepeatDetailsAction() {
  return (dispatch) => {
    dispatch(cleanRepeatDetails())
    try {
      dispatch(cleanRepeatDetailsSuccess())
    } catch (error) {
      dispatch(cleanRepeatDetailsError())
    }
  }
}

const cleanRepeatDetails = () => ({
  type: START_CLEANING_REPEAT_DETAILS,
  payload: true,
})

const cleanRepeatDetailsSuccess = () => ({
  type: CLEAN_REPEAT_DETAILS_SUCCESS,
})

const cleanRepeatDetailsError = () => ({
  type: CLEAN_REPEAT_DETAILS_ERROR,
  payload: true,
})
