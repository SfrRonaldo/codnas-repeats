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

// Initial State
const initialState = {
  general: null,
  structural: null,
  conformers: null,
  error: null,
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case START_GETTING_ESTIMATE_DETAILS:
    case START_CLEANING_ESTIMATE_DETAILS:
    case START_ESTIMATING_CONFORMATIONAL_DIVERSITY:
    case START_ESTIMATING_IN_THE_BACKGROUND:
      return {
        ...state,
        loading: action.payload,
      }
    case GET_ESTIMATE_DETAILS_SUCCESS:
    case ESTIMATE_CONFORMATIONAL_DIVERSITY_SUCCESS:
      return {
        ...state,
        general: action.payload.res1,
        structural: action.payload.res2,
        conformers: action.payload.res3,
        loading: false,
        error: null,
      }
    case GET_ESTIMATE_DETAILS_ERROR:
    case CLEAN_ESTIMATE_DETAILS_ERROR:
    case ESTIMATE_CONFORMATIONAL_DIVERSITY_ERROR:
    case ESTIMATE_IN_THE_BACKGROUND_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CLEAN_ESTIMATE_DETAILS_SUCCESS:
      return {
        ...state,
        general: null,
        structural: null,
        conformers: null,
        error: null,
        loading: false,
      }
    case ESTIMATE_IN_THE_BACKGROUND_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}
