import { authHeader } from '../helpers';
import { urlConstants, getAllCalUrl, deleteCalUrl, createCalUrl } from '../constants';

export const userService = {
  login,
  logout,
  register,
  getAllCalculations,
  deleteCal,
  createCal
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(urlConstants.LOGIN, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
    body: JSON.stringify({ email: JSON.parse(localStorage.getItem('user')).data.email })
  };
  return fetch(urlConstants.LOGOUT, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };
  return fetch(urlConstants.REGISTER, requestOptions).then(handleResponse);
}


function getAllCalculations(user) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  
  return fetch(getAllCalUrl(user.data.id), requestOptions).then(handleResponse);
}


function deleteCal(user, calculationId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };
  return fetch(deleteCalUrl(user.data.id, calculationId), requestOptions).then(handleResponse);
}


function createCal(user, string) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };
  const calParams = `substring_calculations[main_string]=${string.base}&substring_calculations[sub_string]=${string.candidate}`
  return fetch(createCalUrl(user.data.id, calParams), requestOptions).then(handleResponse);
}

function handleResponse(response) { 
  if (response.headers.get('access-token')) {
    localStorage.setItem('auth_cred', JSON.stringify({
      token: response.headers.get('access-token'),
      client: response.headers.get('client'),
      expiry: response.headers.get('expiry'),
      uid: response.headers.get('uid')
    }));
  }

  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
