import {
  START_GETTING_REPEAT_DETAILS,
  GET_REPEAT_DETAILS_SUCCESS,
  GET_REPEAT_DETAILS_ERROR,
  START_CLEANING_REPEAT_DETAILS,
  CLEAN_REPEAT_DETAILS_SUCCESS,
  CLEAN_REPEAT_DETAILS_ERROR,
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
    case START_GETTING_REPEAT_DETAILS:
    case START_CLEANING_REPEAT_DETAILS:
      return {
        ...state,
        loading: action.payload,
      }
    case GET_REPEAT_DETAILS_SUCCESS:
      return {
        ...state,
        general: action.payload.res1,
        structural: action.payload.res2,
        conformers: action.payload.res3,
        loading: false,
        error: null,
      }
    case GET_REPEAT_DETAILS_ERROR:
    case CLEAN_REPEAT_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CLEAN_REPEAT_DETAILS_SUCCESS:
      return {
        ...state,
        general: null,
        structural: null,
        conformers: null,
        error: null,
        loading: false,
      }
    default:
      return state
  }
}
