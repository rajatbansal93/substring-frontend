import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  register,
  getAllCalculations,
  deleteCal
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        user => { 
          dispatch(success(user));
          history.push('/');
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
      .then(
        user => { 
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success('Registration successful'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAllCalculations() {
  return dispatch => {
    let user = JSON.parse(localStorage.getItem('user'));
    dispatch(request(user));
    
    userService.getAllCalculations(user)
    .then(
      calculations => dispatch(success(calculations)),
      error => dispatch(failure(error))
    );

  }

  function request(user) { return { type: userConstants.GET_ALL_CALCULATION_REQUEST, user } }
  function success(calculations) { return { type: userConstants.GET_ALL_CALCULATION_SUCCESS, calculations } }
  function failure(error) { return { type: userConstants.GET_ALL_CALCULATION_FAILURE, error } }
}

function deleteCal(calculationId) {
  return dispatch => {
    let user = JSON.parse(localStorage.getItem('user'));
    dispatch(request(user));
    
    userService.deleteCal(user, calculationId)
    .then(
      calculations => dispatch(success(calculations)),
      error => dispatch(failure(error))
    );

  }

  function request(user) { return { type: userConstants.DELETE_CAL_REQUEST, user } }
  function success(calculations) { return { type: userConstants.DELETE_CAL_SUCCESS, calculations } }
  function failure(error) { return { type: userConstants.DELETE_CAL_FAILURE, error } }
}
