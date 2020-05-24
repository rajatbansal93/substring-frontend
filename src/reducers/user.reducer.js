import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = { calculations: [], user };

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_ALL_CALCULATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_ALL_CALCULATION_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case userConstants.GET_ALL_CALCULATION_SUCCESS:
      return {
        ...state,
        calculations: action.calculations.calculations
      };
    case userConstants.DELETE_CAL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.DELETE_CAL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case userConstants.DELETE_CAL_SUCCESS:
      return {
        ...state,
        calculations: action.calculations.calculations
      };
    case userConstants.CREATE_CAL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.CREATE_CAL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case userConstants.CREATE_CAL_SUCCESS:
      return {
        ...state,
        calculations: [action.calculation].concat(state.calculations)
      };
    default:
      return state
  }
}