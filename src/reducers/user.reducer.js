import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = { calculations: [], user };

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_ALL_CALCULATION_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_ALL_CALCULATION_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.GET_ALL_CALCULATION_SUCCESS:
      return {
        ...initialState,
        calculations: action.calculations.calculations
      };
    case userConstants.DELETE_CAL_REQUEST:
      return {
        loading: true
      };
    case userConstants.DELETE_CAL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_CAL_SUCCESS:
      return {
        ...initialState,
        calculations: action.calculations.calculations
      };
    default:
      return state
  }
}